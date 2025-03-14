# Build stage
FROM node:22.14-alpine3.20 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN corepack enable
RUN yarn install

# Handle bcrypt native module issues
RUN yarn remove bcrypt
RUN yarn add bcrypt

COPY tsconfig.* ./
COPY src ./src

RUN yarn build

# Production stage
FROM node:22.14-alpine3.20 AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./

RUN corepack enable
RUN yarn install --production

EXPOSE 3000

CMD ["node", "dist/main"]
