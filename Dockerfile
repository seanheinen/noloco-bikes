FROM node:22-alpine3.19 AS build-machine

WORKDIR /app

RUN apk add g++ make py3-pip
RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm build

# Build runtime image
FROM node:22-alpine3.19

# For ECS health check
RUN apk add --no-cache curl

ARG DATABASE_CONNECTION_STRING
ENV DATABASE_CONNECTION_STRING=$DATABASE_CONNECTION_STRING

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=build-machine /app/dist ./dist
COPY --from=build-machine /app/node_modules ./node_modules

CMD ["node", "dist/main"]