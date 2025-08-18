# Базовый образ с Playwright
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Устанавливаем зависимости для k6
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем k6 через официальный .deb репозиторий
RUN wget -q -O - https://dl.k6.io/key.gpg | gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npx playwright install --with-deps

# По умолчанию запускать твой K6 тест
CMD ["k6", "run", "first.load.test.js"]
