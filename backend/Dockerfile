FROM node:18-alpine3.19 AS builder

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine3.19

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node",  "dist/main.js"]