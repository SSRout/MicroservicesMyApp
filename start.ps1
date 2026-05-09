# Microservices E-Commerce Platform - Startup Script
# Usage: .\start.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Microservices E-Commerce Platform" -ForegroundColor Cyan
Write-Host "Starting All Services..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "[*] Checking Docker status..." -ForegroundColor Yellow
$dockerStatus = docker ps *>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}
Write-Host "[✓] Docker is running" -ForegroundColor Green
Write-Host ""

# Stop and clean up existing containers
Write-Host "[*] Cleaning up existing containers..." -ForegroundColor Yellow
docker-compose down -v 2>$null
Write-Host "[✓] Cleanup complete" -ForegroundColor Green
Write-Host ""

# Build and start all services
Write-Host "[*] Building and starting all services..." -ForegroundColor Yellow
Write-Host "    This may take 2-3 minutes on first run..." -ForegroundColor Gray
docker-compose up --build

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All Services Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 SERVICE ENDPOINTS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend:" -ForegroundColor White
Write-Host "   • Angular Client:    http://localhost:3000" -ForegroundColor Green
Write-Host "   • Web Client:        http://localhost:8003" -ForegroundColor Green
Write-Host ""
Write-Host "🔌 APIs:" -ForegroundColor White
Write-Host "   • API Gateway:       http://localhost:7000" -ForegroundColor Green
Write-Host "   • Catalog API:       http://localhost:8000" -ForegroundColor Green
Write-Host "   • Cart API:          http://localhost:8001" -ForegroundColor Green
Write-Host "   • Ordering API:      http://localhost:8002" -ForegroundColor Green
Write-Host "   • Auth Service:      http://localhost:8010" -ForegroundColor Green
Write-Host ""
Write-Host "🛠️  Tools:" -ForegroundColor White
Write-Host "   • RabbitMQ Console:  http://localhost:15672 (guest/guest)" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Databases:" -ForegroundColor White
Write-Host "   • MongoDB:           localhost:27017" -ForegroundColor Green
Write-Host "   • Redis:             localhost:6381" -ForegroundColor Green
Write-Host "   • SQL Server:        localhost:1433 (sa/Titan#12)" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
