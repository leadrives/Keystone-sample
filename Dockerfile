FROM node:14

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project (excluding node_modules if regenerated)
COPY . .

# Expose the port
EXPOSE 3000

# Use ts-node to run the TypeScript file
CMD ["npx", "ts-node", "keystone.ts"]