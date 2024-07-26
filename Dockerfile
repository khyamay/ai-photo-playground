FROM node:18.20.2 as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development image
FROM base as development
COPY . .