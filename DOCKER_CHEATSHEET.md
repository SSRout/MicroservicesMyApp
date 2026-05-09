# Quick Reference - Docker Commands Cheat Sheet

## 🚀 Start/Stop Services

| Command                     | Purpose                                |
| --------------------------- | -------------------------------------- |
| `docker-compose up --build` | Start all services (build if needed)   |
| `docker-compose up -d`      | Start in background (detached)         |
| `docker-compose down`       | Stop all services                      |
| `docker-compose down -v`    | Stop and remove volumes (clean)        |
| `docker-compose restart`    | Restart all services                   |
| `.\start.ps1`               | Windows: Automated startup with checks |
| `start.bat`                 | Windows batch: Automated startup       |

---

## 📋 List & Status

| Command             | Purpose                                 |
| ------------------- | --------------------------------------- |
| `docker ps`         | List running containers                 |
| `docker ps -a`      | List all containers (including stopped) |
| `docker compose ls` | List all compose projects               |
| `docker images`     | List Docker images                      |
| `docker network ls` | List networks                           |
| `docker volume ls`  | List volumes                            |

---

## 🔍 View Logs

| Command                                   | Purpose                |
| ----------------------------------------- | ---------------------- |
| `docker logs <container>`                 | View container logs    |
| `docker logs -f <container>`              | Follow logs (live)     |
| `docker logs --tail=50 <container>`       | Last 50 lines          |
| `docker logs -f --timestamps <container>` | With timestamps        |
| `docker-compose logs`                     | All service logs       |
| `docker-compose logs -f catalogapi`       | Follow catalog service |

---

## 🏗️ Build & Rebuild

| Command                                      | Purpose                     |
| -------------------------------------------- | --------------------------- |
| `docker-compose build`                       | Build all services          |
| `docker-compose build --no-cache <service>`  | Rebuild specific service    |
| `docker-compose build <service1> <service2>` | Build multiple services     |
| `docker build -t myapp:latest .`             | Build image from Dockerfile |

---

## ⚙️ Execute Commands

| Command                             | Purpose                     |
| ----------------------------------- | --------------------------- |
| `docker exec -it <container> bash`  | Open shell in container     |
| `docker exec -it <container> sh`    | Open shell (Alpine Linux)   |
| `docker exec <container> <command>` | Run command in container    |
| `docker run -it <image> bash`       | Run container interactively |

---

## 🗂️ File Operations

| Command                                     | Purpose                 |
| ------------------------------------------- | ----------------------- |
| `docker cp <container>:/path/file ./local`  | Copy FROM container     |
| `docker cp ./local/file <container>:/path/` | Copy TO container       |
| `docker exec <container> ls -la /path`      | List files in container |

---

## 🧹 Cleanup

| Command                  | Purpose                   |
| ------------------------ | ------------------------- |
| `docker container prune` | Remove stopped containers |
| `docker image prune`     | Remove unused images      |
| `docker volume prune`    | Remove unused volumes     |
| `docker network prune`   | Remove unused networks    |
| `docker system prune`    | All of above at once      |
| `docker system df`       | Show disk usage           |

---

## 🌐 Network & Ports

| Command                            | Purpose                           |
| ---------------------------------- | --------------------------------- |
| `docker port <container>`          | Show port mappings                |
| `docker network inspect <network>` | Show network details              |
| `docker inspect <container>`       | Show full container info          |
| `netstat -ano \| findstr :PORT`    | Find process using port (Windows) |

---

## 🐛 Debug & Troubleshoot

| Command                                              | Purpose                    |
| ---------------------------------------------------- | -------------------------- |
| `docker logs <container> \| grep ERROR`              | Find errors in logs        |
| `docker stats`                                       | Live resource usage        |
| `docker inspect <container>`                         | Show container config      |
| `docker exec <container> env`                        | Show environment variables |
| `docker ps --format "table {{.Names}}\t{{.Status}}"` | Formatted status           |

---

## 🚀 Service-Specific Quick Commands

### MongoDB

```bash
docker exec -it catalogdb mongosh localhost:27017
```

### Redis

```bash
docker exec -it cartdb redis-cli -p 6379 ping
docker exec -it cartdb redis-cli -p 6379 KEYS '*'
```

### SQL Server

```bash
docker exec -it orderdb /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P Titan#12 -Q "SELECT @@VERSION"
```

### RabbitMQ

```bash
# Management console: http://localhost:15672 (guest/guest)
docker exec rabbitmq rabbitmq-diagnostics -q ping
docker exec rabbitmq rabbitmqctl status
```

---

## 🔗 Service URLs Quick Reference

```
Frontend:     http://localhost:3000          (Angular)
Gateway:      http://localhost:7000          (Ocelot)
Catalog:      http://localhost:8000          (API)
Cart:         http://localhost:8001          (API)
Orders:       http://localhost:8002          (API)
Auth:         http://localhost:8010          (FastAPI)
RabbitMQ:     http://localhost:15672         (Console)

Databases:
MongoDB:      localhost:27017
Redis:        localhost:6381
SQL Server:   localhost:1433
```

---

## ⚡ Performance Tips

```bash
# Build in parallel
docker-compose build --parallel

# Limit resources
docker update --memory 512m --cpus 0.5 <container>

# Check what's using disk
docker system df

# Optimize images
docker image prune -a
```

---

## 🔑 Environment Variables

Set in `.env` file or pass with `-e`:

```bash
docker run -e VAR=value myimage
docker-compose up -e ASPNETCORE_ENVIRONMENT=Development
```

See `.env.example` for all available variables.

---

## 📞 Help

```bash
docker --help
docker-compose --help
docker <command> --help
```
