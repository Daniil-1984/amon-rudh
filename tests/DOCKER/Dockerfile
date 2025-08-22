FROM mcr.microsoft.com/playwright:v1.44.0-jammy
WORKDIR /app

# Копируем package.json и package-lock.json
COPY packages/package*.json ./

RUN npm ci

# Копируем все тесты (desktop + mobile + другие), но потом запускаем только desktop
COPY . ./

RUN npx playwright install --with-deps

# CMD запускает только desktop тесты
CMD ["npx", "playwright", "test", "desktop_tests"]
