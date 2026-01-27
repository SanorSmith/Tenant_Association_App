#!/bin/bash

echo "🚀 Starting deployment to AWS..."

# Configuration
S3_BUCKET="mitt-telenor-demo-48625"
DISTRIBUTION_ID="E3JQX25MJ69KMA"
BUILD_DIR="dist"
REGION="eu-north-1"

# Build
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed!"

# Sync to S3
echo "☁️  Syncing to S3..."
aws s3 sync $BUILD_DIR s3://$S3_BUCKET --delete --region $REGION

if [ $? -ne 0 ]; then
    echo "❌ S3 sync failed!"
    exit 1
fi

echo "✅ S3 sync completed!"

# Invalidate CloudFront
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "🎉 Deployment complete!"
echo "🌐 Your app is live at: https://your-cloudfront-domain.cloudfront.net"
