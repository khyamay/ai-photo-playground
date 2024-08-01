FROM node:18.20.2-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN npm install -g nx nodemon

# Development image
FROM base as development
COPY . .

CMD ["nx", "serve", "api"]