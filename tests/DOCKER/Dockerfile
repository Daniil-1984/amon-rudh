# Базовый образ с Node.js
FROM node:20-bullseye

# Устанавливаем зависимости для Playwright (Desktop + Mobile)
RUN apt-get update && apt-get install -y \
    wget curl gnupg ca-certificates \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdrm2 libxkbcommon0 libxcomposite1 libxrandr2 libxdamage1 libxfixes3 \
    libgbm1 libasound2 libpangocairo-1.0-0 libgtk-3-0 \
    unzip fonts-liberation && \
    rm -rf /var/lib/apt/lists/*

# Устанавливаем Playwright
RUN npm i -D playwright && npx playwright install --with-deps

# Устанавливаем k6
RUN curl -s https://dl.k6.io/key.gpg | gpg --dearmor | tee /usr/share/keyrings/k6-archive-keyring.gpg >/dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*

# Рабочая директория в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json из папки packages
COPY ../packages/package*.json ./

# Устанавливаем зависимости проекта
RUN npm ci

# Копируем весь код из папки packages
COPY ../packages .

# По желанию можно добавить команду по умолчанию
# Например, запуск Playwright тестов
# CMD ["npx", "playwright", "test"]

# Или запуск k6 тестов
# CMD ["k6", "run", "tests/k6/test.js"]
