# PowerShell deployment script for AWS S3 + CloudFront - NEW PROJECT

Write-Host "Starting deployment to AWS..." -ForegroundColor Cyan

# Configuration
$S3_BUCKET = "tenant-association-app"
$DISTRIBUTION_ID = ""  # Temporarily disabled - need correct distribution ID
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

# Invalidate CloudFront cache (if distribution ID provided)
if ($DISTRIBUTION_ID) {
    Write-Host "Invalidating CloudFront cache..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "CloudFront invalidation failed!" -ForegroundColor Red
        exit 1
    }

    Write-Host "CloudFront cache invalidated!" -ForegroundColor Green
} else {
    Write-Host "Skipping CloudFront invalidation (no distribution ID)" -ForegroundColor Yellow
}
Write-Host "Deployment complete!" -ForegroundColor Cyan
Write-Host "Your app is live at: https://tenant-association-app.s3.eu-north-1.amazonaws.com/index.html" -ForegroundColor Cyan
Write-Host "For mobile access, try: https://d8sejzswggj51.cloudfront.net (if distribution exists)" -ForegroundColor Yellow
