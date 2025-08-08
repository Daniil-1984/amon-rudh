FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

USER root
RUN npx playwright install --with-deps

VOLUME ["/app/playwright-report"]

CMD ["npx", "playwright", "test"]
