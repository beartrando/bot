# ---------- BASE ----------
FROM node:22 AS base

WORKDIR /usr/src/app

COPY shared ./shared
COPY pnpm-lock.yaml ./
COPY turbo.json ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./

COPY services/ai/package*.json ./services/ai/
COPY services/ai/jest.config.js ./services/ai/
COPY services/ai/tsconfig.json ./services/ai/
COPY services/ai/src ./services/ai/src/
COPY services/ai/__tests__ ./services/ai/__tests__/
COPY services/ai/prisma ./services/ai/prisma/


# ---------- DEV ----------
FROM base AS dev
ENV NODE_ENV=development

USER root
RUN corepack enable && pnpm install
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 50051

CMD ["pnpm", "--filter", "ai", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD nc -z localhost 50051 || exit 1


# ---------- PROD ----------
FROM base AS prod
ENV NODE_ENV=production

USER root
RUN corepack enable \
 && pnpm install --frozen-lockfile \
 && pnpm run --filter ai build \
 && pnpm prune --prod \
 && chown -R node:node /usr/src/app

USER node

EXPOSE 50051

CMD ["node", "services/ai/dist/app.js"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD nc -z localhost 50051 || exit 1
