# -------- BUILD STAGE --------
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite build
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM nginx:alpine

# Remove default files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output (Vite uses dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Fix React routing
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]