FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

CMD export DATABASE_URL=$(cat /run/secrets/postgres_connection) && \
    npm run dev && \
    npm run prismasetup