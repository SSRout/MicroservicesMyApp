# Microservices E-Commerce Platform - Complete URL Reference

## 🚀 Quick Start

```bash
# Option 1: PowerShell (Windows)
.\start.ps1

# Option 2: Batch (Windows)
start.bat

# Option 3: Docker direct
docker-compose up --build
```

---

## 📍 All Service URLs

### Frontend Applications

| Service                    | URL                   | Purpose                 |
| -------------------------- | --------------------- | ----------------------- |
| **Angular Web Client**     | http://localhost:3000 | Modern SPA - Primary UI |
| **Traditional Web Client** | http://localhost:8003 | ASP.NET Core MVC client |

### API Services

| Service                  | URL                   | Swagger                                  | Purpose                |
| ------------------------ | --------------------- | ---------------------------------------- | ---------------------- |
| **API Gateway (Ocelot)** | http://localhost:7000 | N/A                                      | Central request router |
| **Catalog API**          | http://localhost:8000 | http://localhost:8000/swagger/index.html | Product catalog        |
| **Cart API**             | http://localhost:8001 | http://localhost:8001/swagger/index.html | Shopping cart          |
| **Ordering API**         | http://localhost:8002 | http://localhost:8002/swagger/index.html | Order management       |
| **FastAPI Auth Service** | http://localhost:8010 | http://localhost:8010/docs               | JWT authentication     |

### Message Queue & Cache

| Service                    | URL                    | Credentials   | Purpose                   |
| -------------------------- | ---------------------- | ------------- | ------------------------- |
| **RabbitMQ Admin Console** | http://localhost:15672 | guest / guest | Message broker management |
| **RabbitMQ AMQP**          | localhost:5672         | N/A           | Message protocol endpoint |
| **Redis Cache**            | localhost:6381         | None          | In-memory cache           |

### Databases

| Service        | Connection      | Credentials   | Purpose          |
| -------------- | --------------- | ------------- | ---------------- |
| **MongoDB**    | localhost:27017 | None          | Catalog database |
| **SQL Server** | localhost:1433  | sa / Titan#12 | Order database   |
| **Redis**      | localhost:6381  | None          | Cart cache       |

---

## 🔌 API Endpoints via Gateway

Access all APIs through the Ocelot Gateway at `http://localhost:7000`:

```
/api/catalog/*     → Catalog Service (http://localhost:8000)
/api/cart/*        → Cart Service (http://localhost:8001)
/api/orders/*      → Ordering Service (http://localhost:8002)
/api/auth/*        → Auth Service (http://localhost:8010)
```

**Example Requests:**

```bash
# Get all products
curl http://localhost:7000/api/catalog/products

# Get cart
curl http://localhost:7000/api/cart/get

# Create order
curl -X POST http://localhost:7000/api/orders/create

# Authenticate
curl -X POST http://localhost:7000/api/auth/login
```

---

## 🔐 Authentication Workflow

### Get JWT Token

```bash
curl -X POST http://localhost:8010/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Use Token in Requests

```bash
curl http://localhost:7000/api/orders/user-orders \
  -H "Authorization: Bearer <access_token>"
```

---

## 📊 Docker Compose Services

All services defined in `docker-compose.yml`:

```yaml
Services: ✓ catalogdb        - MongoDB container
  ✓ cartdb           - Redis container
  ✓ orderdb          - SQL Server container
  ✓ rabbitmq         - RabbitMQ container
  ✓ catalog.api      - Catalog Service
  ✓ cart.api         - Cart Service
  ✓ ordering.api     - Ordering Service
  ✓ ocelotgateway    - API Gateway
  ✓ auth.api         - FastAPI Auth
  ✓ angularwebclient - Angular SPA
  ✓ traditionalwebclient - ASP.NET Web Client
```

---

## 🔧 Useful Docker Commands

```bash
# View all running containers
docker ps

# View container logs
docker logs <container_name>

# Follow container logs in real-time
docker logs -f <container_name>

# Stop all services
docker-compose down

# Remove all volumes (clean database)
docker-compose down -v

# Rebuild specific service
docker-compose build --no-cache <service_name>

# Restart service
docker-compose restart <service_name>

# Execute command in container
docker exec -it <container_name> bash
```

---

## ✅ Health Checks

Verify all services are running:

```bash
# Check Catalog API
curl http://localhost:8000/health

# Check Cart API
curl http://localhost:8001/health

# Check Ordering API
curl http://localhost:8002/health

# Check RabbitMQ
curl http://localhost:15672/api/aliveness-test/% -u guest:guest

# Check MongoDB
mongosh --host localhost:27017

# Check Redis
redis-cli -p 6381 ping
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port
netstat -ano | findstr :<port>

# Kill process
taskkill /PID <PID> /F

# Or change port in docker-compose.override.yml
```

### Container Won't Start

```bash
# Check logs
docker logs <container_name>

# Rebuild without cache
docker-compose build --no-cache <service_name>
```

### Permission Denied Errors

```bash
# Run Docker Desktop as Administrator
# Or restart Docker Desktop
```

### Angular App Not Accessible

```bash
# Ensure Docker file has --host 0.0.0.0
# Rebuild: docker-compose build --no-cache angularwebclient
```

---

## 📝 Demo Test Flow

1. **Access Application**: http://localhost:3000
2. **Register Account**: Click "Sign Up"
3. **Login**: Use registered credentials
4. **Browse Products**: View catalog
5. **Add to Cart**: Select products
6. **Checkout**: Complete purchase
7. **View Orders**: Check order history
8. **Monitor Queue**: Check http://localhost:15672 for messages

---

## 🔄 Service Dependencies

```
Angular Client → API Gateway (7000)
                 ├→ Catalog API (8000) → MongoDB
                 ├→ Cart API (8001) → Redis → RabbitMQ
                 ├→ Ordering API (8002) → SQL Server → RabbitMQ
                 └→ Auth API (8010)
```

---

## 📚 Additional Resources

- [Angular Client README](src/WebClient/AngularWebClient/README.md)
- [API Gateway Configuration](src/ApiGateWays/OcelotGateWay/ocelot.json)
- [Docker Compose Configuration](docker-compose.yml)
- [Environment Variables](.env.example)
