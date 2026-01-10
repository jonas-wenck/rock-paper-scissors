# this is adapted from: https://medium.com/@nadir.inab.dev/dockerizing-your-angular-app-a-quick-guide-00a3ecabe419

FROM node:24-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build app/dist/rock-paper-scissors/browser /usr/share/nginx/html

EXPOSE 80