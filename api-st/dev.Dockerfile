FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json - this needs to happen in the Dockerfile, because a volume is mounted at runtime
COPY . .
RUN npm install

# Specify the command to run your app
CMD /bin/sh -c 'export DATABASE_URL=$(cat "$DATABASE_URL_FILE") && npm run dev && npm run prismasetup'