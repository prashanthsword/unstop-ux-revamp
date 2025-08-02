#!/bin/bash

echo "🚀 AgroSoft GitHub Upload Script"
echo "================================="

# Check if we're in the right directory
if [ ! -f "App.js" ]; then
    echo "❌ Error: Please run this script from the AgroSoft directory"
    exit 1
fi

echo "✅ AgroSoft project detected"

# Add all files
git add .

# Commit any new changes
git commit -m "Update AgroSoft mobile app - $(date)"

# Push to GitHub
echo "🔄 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "🎉 SUCCESS! Your code is now on GitHub:"
    echo "👉 https://github.com/prashanthsword/Agrosoft"
else
    echo "❌ Push failed. You may need to authenticate with GitHub first."
    echo "💡 Try: git push -u origin main"
    echo "💡 Or upload files manually to: https://github.com/prashanthsword/Agrosoft"
fi