# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /src

# Copy and install dependencies (including dev for TypeScript build)
COPY package*.json ./
RUN npm ci

# Copy all files and build the project
COPY . .
RUN npm run build

# Stage 2 — Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /src/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Command to run your app
CMD ["node", "dist/index.js"]
