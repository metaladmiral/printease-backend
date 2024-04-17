# Use Ubuntu as the base image
FROM ubuntu:latest

# Install essential dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js version 18.18.2
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# RUN echo "172.17.0.1    host.docker.internal" | tee -a /etc/hosts

# Build TypeScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

RUN npx prisma generate

# Command to run the application
CMD ["npm", "start"]
