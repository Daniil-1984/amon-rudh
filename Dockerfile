# Базовый образ с Playwright
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Устанавливаем k6
RUN apt-get update && apt-get install -y gnupg software-properties-common && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E836D0 && \
    echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npx playwright install --with-deps

# По умолчанию запускать только твой K6 тест
CMD ["k6", "run", "first.load.test.js"]
