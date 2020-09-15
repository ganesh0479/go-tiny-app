### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
RUN apk add --update git
RUN git clone -b master git://github.com/ganesh0479/go-tiny-app.git
WORKDIR /usr/src/app/go-tiny-app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/go-tiny-app/dist/go-tiny-app /usr/share/nginx/html
