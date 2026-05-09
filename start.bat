@echo off
REM Microservices E-Commerce Platform - Startup Script
REM Usage: start.bat

echo.
echo ========================================
echo Microservices E-Commerce Platform
echo Starting All Services...
echo ========================================
echo.

REM Check if Docker is running
echo [*] Checking Docker status...
docker ps >nul 2>&1
if errorlevel 1 (
    echo [!] Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)
echo [+] Docker is running
echo.

REM Stop and clean up existing containers
echo [*] Cleaning up existing containers...
docker-compose down -v
echo [+] Cleanup complete
echo.

REM Build and start all services
echo [*] Building and starting all services...
echo     This may take 2-3 minutes on first run...
docker-compose up --build

echo.
echo ========================================
echo All Services Started Successfully!
echo ========================================
echo.
echo SERVICE ENDPOINTS:
echo.
echo FRONTEND:
echo   - Angular Client:    http://localhost:3000
echo   - Web Client:        http://localhost:8003
echo.
echo APIs:
echo   - API Gateway:       http://localhost:7000
echo   - Catalog API:       http://localhost:8000
echo   - Cart API:          http://localhost:8001
echo   - Ordering API:      http://localhost:8002
echo   - Auth Service:      http://localhost:8010
echo.
echo TOOLS:
echo   - RabbitMQ Console:  http://localhost:15672 (guest/guest)
echo.
echo DATABASES:
echo   - MongoDB:           localhost:27017
echo   - Redis:             localhost:6381
echo   - SQL Server:        localhost:1433 (sa/Titan#12)
echo.
echo ========================================
pause
