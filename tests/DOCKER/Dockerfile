FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Копируем package.json и package-lock.json из папки packages
COPY packages/package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем сами тесты
COPY . .

# Устанавливаем браузеры Playwright
RUN npx playwright install --with-deps

# По умолчанию запускаем все тесты
CMD ["npx", "playwright", "test"]
