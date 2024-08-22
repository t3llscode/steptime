# Use a Node.js base image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Specify the command to run your app
CMD ["node", "dist/index.js"]