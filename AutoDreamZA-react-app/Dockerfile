# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the app source code
COPY . .

# Build the TypeScript backend (adjust if necessary)
RUN npx tsc --project tsconfig.server.json

# Expose the port your app runs on
EXPOSE 5000

# Start the server
CMD ["node", "dist/src/BACKEND/server.js"]
