FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY modules modules
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["bun", "modules/index.ts"]

EXPOSE 3000