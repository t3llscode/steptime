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

CMD /bin/sh -c 'export DATABASE_URL=$(cat "$DATABASE_URL_FILE") && \
 npm run start && \
 npm run prismasetup'