FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN corepack enable
RUN yarn install

RUN yarn remove bcrypt
RUN yarn add bcrypt

COPY tsconfig.* ./
COPY ./src ./src

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main"]
