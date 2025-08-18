# Development stage
FROM node:22.18-alpine3.22 AS development

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Install global packages (for NestJS CLI if you want to use it for dev)
RUN npm install -g @nestjs/cli

# Expose port (default for NestJS)
EXPOSE 3000

# Development command to run the app with auto-reload
CMD ["npm", "run", "start:dev"]
