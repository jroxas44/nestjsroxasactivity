# Start Backend Server Script
$backendPath = Join-Path $PSScriptRoot "backend"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Todo App Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
$envFile = Join-Path $backendPath ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Location: $envFile" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run configure-env.ps1 first to create it." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✓ .env file found" -ForegroundColor Green

# Check if migrations exist
$migrationsPath = Join-Path $backendPath "prisma\migrations"
if (-not (Test-Path $migrationsPath)) {
    Write-Host ""
    Write-Host "⚠ Migrations not found. Running setup..." -ForegroundColor Yellow
    Write-Host ""
    
    Push-Location $backendPath
    
    Write-Host "Generating Prisma client..." -ForegroundColor Yellow
    npx prisma generate
    
    Write-Host ""
    Write-Host "Running migrations..." -ForegroundColor Yellow
    Write-Host "Note: Make sure database 'todo_db' exists first!" -ForegroundColor Cyan
    npx prisma migrate dev --name init
    
    Pop-Location
}

Write-Host ""
Write-Host "Starting backend server..." -ForegroundColor Yellow
Write-Host "Backend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

Push-Location $backendPath
pnpm run start:dev

