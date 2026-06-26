FROM node:22 AS base

ENV NODE_ENV=development
WORKDIR /usr/src/app/

# Копируем только необходимые файлы для установки зависимостей
COPY shared/ ./shared/
COPY turbo.json ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./

COPY services/ai/package*.json ./services/ai/
COPY services/ai/jest.config.js ./services/ai/
COPY services/ai/tsconfig.json ./services/ai/

# Установка зависимостей
USER root
RUN apt-get clean && \
    mkdir -p /var/lib/apt/lists/partial && \
    apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable && pnpm install --frozen-lockfile --prod

# Копируем исходный код
COPY services/ai/src ./services/ai/src/
COPY services/ai/.env ./services/ai/.env

# Меняем владельца
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 50051

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD nc -z localhost 50051 || exit 1

CMD ["pnpm", "--filter", "test", "start"]