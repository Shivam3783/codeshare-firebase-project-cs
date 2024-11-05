# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Copy the .env file
# COPY .env ./

# Step 7: Build the Next.js application
RUN npm run build

# Step 8: Expose the port the app runs on
EXPOSE 3000

# Step 9: Start Redis and the production build of Next.js
CMD npm run start
