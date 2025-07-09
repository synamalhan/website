#!/bin/bash

# Exit immediately on error
set -e

echo "➡️  Adding all changes..."
git add .

echo "📝 Enter commit message:"
read COMMIT_MESSAGE

git commit -m "$COMMIT_MESSAGE"
echo "📤 Pushing to GitHub..."
git push origin main

echo "🏗️  Building the project..."
npm run build

echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Code pushed and deployed successfully!"
