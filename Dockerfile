# Use official Playwright image with all dependencies installed
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all project files
COPY . .

# Set environment variables (optional)
ENV CI=true

# Run tests by default (you can override this in docker run)
CMD ["npx", "playwright", "test"]
