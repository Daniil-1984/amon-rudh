# Базовый образ с Node.js и Playwright
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json если есть
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все тесты
COPY . .

# Устанавливаем Chrome для десктопных и мобильных тестов (если нужно)
# Но в образе Playwright уже есть все браузеры
# RUN npx playwright install

# Команда по умолчанию
CMD ["node"]
