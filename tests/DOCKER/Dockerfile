# Базовый образ с Node.js
FROM node:20-slim

# Устанавливаем зависимости для Playwright
RUN apt-get update && \
    apt-get install -y wget curl git libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 && \
    rm -rf /var/lib/apt/lists/*

# Устанавливаем k6
RUN curl -s https://dl.k6.io/key.gpg | gpg --dearmor | tee /usr/share/keyrings/k6-archive-keyring.gpg >/dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для Playwright
COPY package*.json ./

# Устанавливаем Node зависимости (Playwright)
RUN npm install

# Копируем тесты
COPY . .

# Устанавливаем браузеры Playwright
RUN npx playwright install --with-deps

# По умолчанию контейнер ничего не запускает
CMD [ "bash" ]
