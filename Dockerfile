# -------- Builder --------
    FROM node:20-bullseye AS builder
    WORKDIR /app

    RUN npm install -g pnpm

    COPY package*.json ./
    
    RUN pnpm install    

    COPY tsconfig.json ./
    COPY src ./src
    RUN pnpm --filter api build
    
    # -------- Runner --------
    FROM node:20-slim AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    

    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    COPY package*.json ./
    
    EXPOSE 3001
    
    CMD ["sh", "-c", "npm start"]
