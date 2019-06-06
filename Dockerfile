FROM node:10-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json

RUN npm run build

RUN npm install -g serve

CMD serve -s build
