# Use the official Node.js 22 LTS image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Copy .env file into the container
COPY .env .env

# Generate Prisma client with env loaded
RUN npx dotenv -e .env -- npx prisma generate


# Expose the port your server will run on
EXPOSE 3000

# Set environment variables (optional, can also use .env)
# ENV DATABASE_URL=mysql://root:admin123@db:3306/jsDB

# Start the server
CMD ["node", "server.js"]
