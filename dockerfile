FROM node:22-alpine

# Buat working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy package files & beri ownership ke node
COPY --chown=node:node package*.json ./

# Buat folder node_modules dan beri permission sebelum switch user
RUN mkdir node_modules && chown -R node:node /app

# Ganti ke user node
USER node

# Install dependencies
RUN npm install

# Copy semua source code dengan ownership yang benar
COPY --chown=node:node . .

# Build aplikasi
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]