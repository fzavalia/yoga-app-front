FROM node:10-alpine as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

RUN npm run build

FROM nginx:1.17-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
