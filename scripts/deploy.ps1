# PowerShell deployment script for AWS S3 + CloudFront

Write-Host "Starting deployment to AWS..." -ForegroundColor Cyan

# Configuration
$S3_BUCKET = "mitt-telenor-demo-48625"
$DISTRIBUTION_ID = "E3JQX25MJ69KMA"
$BUILD_DIR = "dist"
$REGION = "eu-north-1"

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npx vite build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green

# Sync to S3
Write-Host "Syncing to S3 bucket: $S3_BUCKET..." -ForegroundColor Yellow
aws s3 sync $BUILD_DIR s3://$S3_BUCKET --delete --region $REGION

if ($LASTEXITCODE -ne 0) {
    Write-Host "S3 sync failed!" -ForegroundColor Red
    exit 1
}

Write-Host "S3 sync completed!" -ForegroundColor Green

# Invalidate CloudFront cache
Write-Host "Invalidating CloudFront cache..." -ForegroundColor Yellow
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

if ($LASTEXITCODE -ne 0) {
    Write-Host "CloudFront invalidation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "CloudFront cache invalidated!" -ForegroundColor Green
Write-Host "Deployment complete!" -ForegroundColor Cyan
Write-Host "Your app is live at your CloudFront domain" -ForegroundColor Cyan
