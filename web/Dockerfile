FROM node:22.14-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.* ./
COPY app ./app
COPY public ./public
COPY components ./components
COPY hooks ./hooks
COPY lib ./lib
COPY components.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]
