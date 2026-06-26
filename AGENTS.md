## File encoding rules

- Treat every text source file as UTF-8.
- Preserve the existing BOM and line endings.
- Never decode text using the system ANSI/OEM code page.
- Never rewrite an entire file when a small patch is sufficient.
- Prefer apply_patch or byte-safe editing methods.
- On Windows, do not use Windows PowerShell 5.1 redirection,
  Out-File, Set-Content, or Add-Content for source files unless
  the encoding is explicitly controlled.
- Before finishing, verify that modified text files:
  - decode as strict UTF-8;
  - do not contain U+FFFD replacement characters;
  - do not contain newly introduced mojibake.
- If a file is not valid UTF-8, stop and report its detected
  encoding instead of rewriting it.
