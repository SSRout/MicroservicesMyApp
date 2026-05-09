# Docker Setup & Troubleshooting Guide

## ✅ Prerequisites

- **Docker Desktop** installed and running (Windows/Mac) or **Docker + Docker Compose** (Linux)
- **Node.js 18+** (for local Angular development)
- **.NET 8 SDK** (for local backend development)
- **Python 3.9+** (for FastAPI auth service)
- **At least 6GB** free disk space for Docker images and volumes

## 🚀 Quick Start

### Option 1: Automated Script (Recommended for Windows)

```powershell
# PowerShell
.\start.ps1

# Batch CMD
start.bat
```

### Option 2: Manual Docker Setup

```bash
# Navigate to project root
cd e:\GitRepo\MicroservicesMyApp

# Clean up any existing containers
docker-compose down -v

# Build and start all services
docker-compose up --build

# In another terminal, check status
docker ps
```

### Option 3: Build & Run Specific Services

```bash
# Build everything without running
docker-compose build

# Run only backend services
docker-compose up catalogdb cartdb orderdb rabbitmq

# In another terminal, run APIs
docker-compose up catalog.api cart.api ordering.api ocelotgateway auth.api
```

---

## 🔍 Verification Checklist

After starting, verify all services:

```bash
# ✓ Check all containers running
docker ps -a

# ✓ Check specific service logs
docker logs angularwebclient
docker logs catalogapi

# ✓ Test API Gateway
curl http://localhost:7000

# ✓ Test Catalog API
curl http://localhost:8000/api/products

# ✓ Access Angular app
open http://localhost:3000
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Port Already in Use

**Error**: `ports are not available: exposing port TCP 0.0.0.0:XXXX`

**Solution**:

```bash
# Find what's using the port
netstat -ano | findstr :XXXX

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change port in docker-compose.override.yml
# Example: change 6381:6379 to 6382:6379
```

### Issue 2: Container Fails to Start

**Error**: `Container exited with code 1`

**Solution**:

```bash
# Check the logs
docker logs <container_name>

# Rebuild without cache
docker-compose build --no-cache <service_name>

# Try again
docker-compose up <service_name>
```

### Issue 3: Angular App Not Accessible

**Error**: `Connection refused on localhost:3000`

**Solution**:

```bash
# Verify container is running
docker ps | grep angularwebclient

# Check logs
docker logs angularwebclient

# Ensure Dockerfile has correct CMD
# Should be: CMD ["serve", "-s", "dist", "-l", "3000", "--host", "0.0.0.0"]

# Rebuild
docker-compose build --no-cache angularwebclient
docker-compose up angularwebclient
```

### Issue 4: Database Connection Errors

**Error**: `Could not connect to MongoDB/Redis/SQL Server`

**Solution**:

```bash
# Wait longer - databases take time to initialize
# First run can take 2-3 minutes

# Verify database containers started
docker ps | grep catalogdb
docker ps | grep cartdb
docker ps | grep orderdb

# Check database logs
docker logs catalogdb
docker logs cartdb
docker logs orderdb

# Manually test connection
# MongoDB:
docker exec -it catalogdb mongosh localhost:27017

# Redis:
docker exec -it cartdb redis-cli -p 6379 ping

# SQL Server:
docker exec -it orderdb /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Titan#12
```

### Issue 5: RabbitMQ Issues

**Error**: `Failed to connect to RabbitMQ`

**Solution**:

```bash
# Check RabbitMQ is running
docker ps | grep rabbitmq

# Check logs
docker logs rabbitmq

# Access management console
# http://localhost:15672 (guest/guest)

# Test connection
docker exec -it rabbitmq rabbitmq-diagnostics -q ping
```

### Issue 6: Docker Disk Space Full

**Error**: `no space left on device`

**Solution**:

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove all stopped containers
docker container prune

# Check disk usage
docker system df
```

---

## 🛠️ Development Tips

### Access Container Shell

```bash
# Bash/Shell
docker exec -it <container_name> bash

# PowerShell (for .NET containers)
docker exec -it <container_name> powershell

# Python (for auth service)
docker exec -it authapi python -c "import sys; print(sys.version)"
```

### View Real-time Logs

```bash
# Follow logs from all services
docker-compose logs -f

# Follow logs from specific service
docker-compose logs -f catalogapi

# Last 100 lines
docker-compose logs --tail=100

# With timestamps
docker-compose logs -f --timestamps
```

### Copy Files To/From Container

```bash
# Copy FROM container
docker cp <container_name>:/app/file.txt ./local-file.txt

# Copy TO container
docker cp ./local-file.txt <container_name>:/app/file.txt
```

### Rebuild a Single Service

```bash
# Stop it
docker-compose stop catalogapi

# Rebuild
docker-compose build --no-cache catalogapi

# Restart
docker-compose up catalogapi
```

### Clean Everything and Start Fresh

```bash
# Remove all containers, volumes, and networks
docker-compose down -v

# Remove all Docker images (optional)
docker image prune -a

# Start fresh
docker-compose up --build
```

---

## 📊 Performance Optimization

### Reduce Memory Usage

```bash
# Limit resources in docker-compose.override.yml
services:
  catalogapi:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Speed Up Builds

```bash
# Use build cache
docker-compose build

# Parallel build (experimental)
docker-compose build --parallel
```

---

## 🔐 Security Notes

### For Development Only

⚠️ **WARNING**: The provided credentials are for development only:

- SQL Server SA Password: `Titan#12`
- RabbitMQ User: `guest/guest`

### Production Deployment

For production:

1. Change all default passwords
2. Use environment variable `.env` files
3. Enable authentication for MongoDB/Redis
4. Use Docker secrets for sensitive data
5. Configure HTTPS/SSL
6. Set up proper firewall rules

See `.env.example` for configuration template.

---

## 📈 Monitoring & Health Checks

### Health Check Endpoints

```bash
# ASP.NET Services
curl http://localhost:8000/health
curl http://localhost:8001/health
curl http://localhost:8002/health

# FastAPI Service
curl http://localhost:8010/health

# RabbitMQ
curl http://localhost:15672/api/aliveness-test/% -u guest:guest
```

### Docker Health Status

```bash
# Check service health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

---

## 🚨 Emergency Procedures

### Stop All Services Gracefully

```bash
docker-compose down
```

### Force Stop Everything

```bash
docker-compose kill
docker-compose down -v
```

### Recover From Corrupted State

```bash
# Remove everything
docker-compose down -v

# Prune all unused resources
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

---

## 📞 Getting Help

- Check logs: `docker logs <container_name>`
- Read full docs: See [URLS.md](URLS.md)
- Check service health: `docker ps -a`
- Verify network: `docker network ls`

---

## 🔗 Useful Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Project README](README.md)
- [Service URLs](URLS.md)
