# Базовый образ
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps

# Добавим точку монтирования для отчета
VOLUME ["/app/playwright-report"]

CMD ["npx", "playwright", "test"]
