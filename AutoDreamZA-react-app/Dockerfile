
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npx tsc --project tsconfig.server.json


EXPOSE 5000


CMD ["node", "dist/src/BACKEND/server.js"]
