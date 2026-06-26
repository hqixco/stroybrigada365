import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = Number(process.env.PORT || 3000);
const TELEGRAM_TIMEOUT_MS = 9000;
const BODY_LIMIT = '50kb';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

const allowedOrigins = new Set([
  'https://stroybrigada365.relaxdev.ru',
  'https://stroybrigada-365.ru',
  'https://www.stroybrigada-365.ru',
  'http://localhost:5173',
  'http://localhost:3000'
]);

const fieldLimits = {
  name: 120,
  phone: 40,
  email: 160,
  service: 200,
  message: 4000,
  comment: 4000,
  form_name: 200,
  page: 500,
  website: 200,
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 180,
  utm_content: 180,
  utm_term: 180,
  yclid: 180,
  contact_method: 80,
  source_id: 200,
  number_foto: 120,
  link_foto: 500,
  attachment_name: 240
};

const rateLimitStore = new Map();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeWhitespace(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeValue(key, value) {
  const limit = fieldLimits[key] || 500;
  return normalizeWhitespace(value).slice(0, limit);
}

function normalizeArray(values, itemLimit = 200) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => normalizeWhitespace(value).slice(0, itemLimit))
    .filter(Boolean);
}

function getClientIp(req) {
  return normalizeWhitespace(req.ip || req.socket?.remoteAddress || 'unknown');
}

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return true;
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const fresh = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (fresh.length) {
      rateLimitStore.set(ip, fresh);
    } else {
      rateLimitStore.delete(ip);
    }
  }
}

setInterval(cleanupRateLimitStore, RATE_LIMIT_WINDOW_MS).unref();

function normalizePayload(body) {
  const payload = {};
  const keys = Object.keys(fieldLimits);

  for (const key of keys) {
    payload[key] = sanitizeValue(key, body?.[key]);
  }

  payload.quiz_answers = Array.isArray(body?.quiz_answers)
    ? body.quiz_answers
        .map((item) => ({
          question: sanitizeValue('message', item?.question),
          answer: Array.isArray(item?.answer)
            ? normalizeArray(item.answer, 300)
            : sanitizeValue('message', item?.answer)
        }))
        .filter((item) => item.question && (Array.isArray(item.answer) ? item.answer.length : item.answer))
    : [];

  return payload;
}

function isValidEmail(email) {
  if (!email) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLikelyPhone(phone) {
  if (!phone) {
    return false;
  }

  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function validateLead(payload) {
  const hasPhone = isLikelyPhone(payload.phone);
  const hasEmail = isValidEmail(payload.email);
  const isReviewForm = payload.form_name.toLowerCase() === 'отзыв';

  if (!payload.form_name) {
    return 'Не указана форма';
  }

  if (!payload.page) {
    return 'Не указана страница';
  }

  if (!hasPhone && !hasEmail && !isReviewForm) {
    return 'Нужен телефон или email';
  }

  if (payload.email && !hasEmail) {
    return 'Некорректный email';
  }

  if (payload.phone && !hasPhone) {
    return 'Некорректный телефон';
  }

  if (isReviewForm && !payload.comment && !payload.message) {
    return 'Отзыв пустой';
  }

  return null;
}

function buildTelegramMessage(payload) {
  const lines = ['<b>Новая заявка с сайта</b>', ''];

  const addLine = (label, value) => {
    if (!value) {
      return;
    }

    lines.push(`<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`);
  };

  addLine('Форма', payload.form_name);
  addLine('Имя', payload.name);
  addLine('Телефон', payload.phone);
  addLine('Email', payload.email);
  addLine('Услуга', payload.service);
  addLine('Способ связи', payload.contact_method);
  addLine('Номер фото', payload.number_foto);
  addLine('Ссылка на фото', payload.link_foto);
  addLine('Комментарий', payload.comment);
  addLine('Сообщение', payload.message);
  addLine('Источник формы', payload.source_id);
  addLine('Файл', payload.attachment_name);

  if (payload.quiz_answers.length) {
    lines.push('');
    lines.push('<b>Ответы квиза:</b>');
    for (const item of payload.quiz_answers) {
      const answer = Array.isArray(item.answer) ? item.answer.join(', ') : item.answer;
      addLine(item.question, answer);
    }
  }

  lines.push('');
  addLine('Страница', payload.page);

  const sourceParts = [payload.utm_source, payload.utm_medium].filter(Boolean);
  if (sourceParts.length) {
    addLine('Источник', sourceParts.join(' / '));
  }

  addLine('Кампания', payload.utm_campaign);
  addLine('Контент', payload.utm_content);
  addLine('Ключ', payload.utm_term);
  addLine('yclid', payload.yclid);

  lines.push('');
  addLine(
    'Дата',
    new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Moscow'
    }).format(new Date())
  );

  return lines.join('\n');
}

async function sendTelegramMessage(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: buildTelegramMessage(payload),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      signal: controller.signal
    });

    const telegramResult = await response.json().catch(() => ({}));

    if (!response.ok || telegramResult.ok !== true) {
      const description = sanitizeValue('message', telegramResult?.description || `HTTP ${response.status}`);
      const error = new Error(description);
      error.statusCode = response.status;
      throw error;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

app.use(express.json({ limit: BODY_LIMIT, type: 'application/json' }));

app.all('/api/lead', async (req, res) => {
  if (req.method !== 'POST') {
    res.set('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  const origin = req.get('origin');
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  if (!req.is('application/json')) {
    return res.status(400).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.error('[lead] Missing BOT_TOKEN or CHAT_ID');
    return res.status(500).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  const payload = normalizePayload(req.body);

  if (payload.website) {
    return res.status(200).json({
      success: true,
      message: 'Заявка отправлена'
    });
  }

  const validationError = validateLead(payload);
  if (validationError) {
    return res.status(422).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  try {
    await sendTelegramMessage(payload);

    return res.status(200).json({
      success: true,
      message: 'Заявка отправлена'
    });
  } catch (error) {
    const isAbort = error?.name === 'AbortError';
    const statusCode = isAbort ? 502 : 502;
    console.error(
      `[lead] ${new Date().toISOString()} form="${payload.form_name}" telegram_status="${error?.statusCode || 'n/a'}" message="${sanitizeValue('message', error?.message || 'unknown error')}"`
    );

    return res.status(statusCode).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }
});

app.use(express.static(DIST_DIR, {
  extensions: ['html'],
  index: 'index.html',
  redirect: true
}));

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'Не удалось отправить заявку'
    });
  }

  return next(error);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] Listening on 0.0.0.0:${PORT}`);
});
