# Build Stage
FROM node:latest AS build_stage

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

# Production Stage
FROM node:latest-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build_stage /app/dist ./dist

CMD export DATABASE_URL=$(cat /run/secrets/postgres_connection) && \
    npm run start && \
    npm run prismasetup