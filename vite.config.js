import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  publicDir: 'public-src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        besedki: resolve(__dirname, 'besedki/index.html'),
        cookie: resolve(__dirname, 'cookie/index.html'),
        fasadnyeRaboty: resolve(__dirname, 'fasadnye-raboty/index.html'),
        krovelnyeRaboty: resolve(__dirname, 'krovelnye-raboty/index.html'),
        personal: resolve(__dirname, 'personal/index.html'),
        policy: resolve(__dirname, 'policy/index.html'),
        pristroyki: resolve(__dirname, 'pristroyki/index.html'),
        stroitelstvoFundamenta: resolve(__dirname, 'stroitelstvo-fundamenta/index.html'),
        stroitelstvoRekonstrukciyaDomov: resolve(__dirname, 'stroitelstvo-rekonstrukciya-domov/index.html'),
        ukladkaBruschatki: resolve(__dirname, 'ukladka-bruschatki/index.html'),
        ustrojstvoOtmostki: resolve(__dirname, 'ustrojstvo-otmostki-vokrug-doma/index.html'),
        uteplenieDoma: resolve(__dirname, 'uteplenie-doma/index.html'),
        vostanovlenieStaryhDomovIDach: resolve(__dirname, 'vostanovlenie-staryh-domov-i-dach/index.html')
      }
    }
  }
});
