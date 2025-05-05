#!/bin/bash

echo "🚀 Starting LocalStack..."
docker compose up -d

echo "🛠️ Starting Node.js app with PM2..."
pm2 start src/index.js --name my-node-app -f

echo "✅ All services are up and running!"
docker ps
pm2 list
