# ------------------------------
# 1. Base image (Debian for Prisma compatibility)
# ------------------------------
FROM node:18-bullseye AS base

# ------------------------------
# 2. Dependencies stage
# ------------------------------
FROM base AS deps
WORKDIR /app

# Install dependencies (skip Prisma scripts here)
COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts

# ------------------------------
# 3. Builder stage
# ------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy full project
COPY . .

# Generate Prisma client (now schema exists)
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ------------------------------
# 4. Runner stage (lightweight)
# ------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]