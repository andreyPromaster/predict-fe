FROM node:20.11 as build

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/
COPY app.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]