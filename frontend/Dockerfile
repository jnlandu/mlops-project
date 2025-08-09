# Use an official lightweight Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN npm run build

# Expose port 3000 for the service
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
