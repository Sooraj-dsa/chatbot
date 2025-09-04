#!/bin/bash

echo "Deploying ChatBridge..."
echo "Deployment timestamp: 2025-09-04 15:55:32"
echo "Deployed by: Sooraj-dsa"

# Install dependencies
cd frontend
npm install

# Build the application
npm run build

# Deploy to Vercel
vercel --prod