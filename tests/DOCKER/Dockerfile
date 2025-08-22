# Используем официальный образ Node.js
FROM node:18-bullseye-slim

# Устанавливаем зависимости для Playwright
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Добавляем ключ и репозиторий для k6
RUN curl -fsSL https://dl.k6.io/key.gpg | tee /etc/apt/trusted.gpg.d/k6.asc
RUN echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list

# Обновляем список пакетов и устанавливаем k6
RUN apt-get update && apt-get install -y k6

# Устанавливаем Playwright и его зависимости
RUN npm install -g playwright

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm ci

# Копируем все остальные файлы проекта
COPY . .

# Указываем команду по умолчанию
CMD ["npm", "test"]
