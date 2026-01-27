# Fix CloudFront Access Denied Issue

## Problem:
CloudFront distribution d8sejzswggj51.cloudfront.net is getting "Access Denied" when trying to access S3.

## Solution:
Update CloudFront distribution to use S3 website endpoint instead of REST API.

## Steps:
1. Go to CloudFront Console
2. Select distribution d8sejzswggj51
3. Click "Edit" 
4. Update Origin domain to: tenant-association-app.s3-website.eu-north-1.amazonaws.com
5. Save changes
6. Wait 5-10 minutes for deployment

## Alternative:
Create new CloudFront distribution with correct S3 website endpoint.
