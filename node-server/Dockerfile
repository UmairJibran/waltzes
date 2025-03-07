FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY package.json ./

RUN corepack enable
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main"]
