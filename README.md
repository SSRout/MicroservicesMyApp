# Microservices E-Commerce Application

A comprehensive microservices-based e-commerce platform featuring a modern Angular web client, ASP.NET Core backend services, FastAPI authentication service, and complete Docker orchestration.

## 🏗️ Architecture Overview

This project implements a complete microservices architecture with:

- **API Gateway** (Ocelot) - Central request routing
- **Authentication Service** (FastAPI) - JWT token generation and user management
- **Catalog Service** (ASP.NET Core) - Product catalog with MongoDB
- **Cart Service** (ASP.NET Core) - Shopping cart with Redis
- **Ordering Service** (ASP.NET Core) - Order management with SQL Server
- **Angular Web Client** - Modern responsive SPA
- **Message Bus** (RabbitMQ) - Asynchronous service communication

## 🚀 Quick Start

### Docker Compose (Recommended - Everything in One Command)

```bash
# Navigate to project root
cd e:\GitRepo\MicroservicesMyApp

# Start all services
docker-compose up --build

# Access the applications:
# Angular Web Client:     http://localhost:3000
# Ocelot Gateway:         http://localhost:7000
# FastAPI Auth Service:   http://localhost:8010
# Catalog API:            http://localhost:8000
# Cart API:               http://localhost:8001
# Ordering API:           http://localhost:8002
```

### Demo Credentials

```
Email:    demo@example.com
Password: secret
```

## 🔐 Authentication System

### FastAPI Auth Service

The authentication system is built with FastAPI and provides:

- **User Registration** - Create new accounts with email/password
- **User Login** - Authenticate and receive JWT tokens
- **Token Verification** - Validate token integrity
- **User Profile** - Get current user information
- **Logout** - Invalidate sessions

**Service Details:**

- Port: 8010 (Docker), 8003 (Direct)
- Token Type: JWT (Bearer)
- Token Expiry: 30 minutes
- Password Hashing: bcrypt

## ✨ Features

### 🛍️ Shopping Features

- **Product Catalog** - Browse products with filtering
- **Product Details** - View complete product information
- **Shopping Cart** - Add/remove items with quantity management
- **Checkout** - Multi-step secure checkout process
- **Order History** - View all previous orders
- **Order Confirmation** - Print-friendly receipts

### 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt password protection
- **Route Guards** - Protected checkout and order pages
- **HTTP Interceptors** - Automatic token injection
- **CORS Enabled** - Secure cross-origin requests
- **Form Validation** - Real-time input validation

### 💎 UI/UX Features

- **Material Design** - Professional Google Material components
- **Responsive Layout** - Mobile, tablet, and desktop support
- **Real-time Updates** - RxJS-based reactive state management
- **Smooth Animations** - CSS transitions and Material effects
- **Dark Mode Ready** - Angular Material theming support

## 📁 Project Structure

```
.
├── docker-compose.yml                 # Service definitions
├── docker-compose.override.yml        # Development configuration
├── LICENSE
├── README.md
├── MicroservicesMyApp.sln             # Visual Studio solution
├── src/
│   ├── ApiGateWays/
│   │   └── OcelotGateWay/             # Request routing and aggregation
│   ├── Catalog/
│   │   └── Catalog.API/               # Product catalog service
│   ├── Cart/
│   │   └── Cart.API/                  # Shopping cart service
│   ├── Common/
│   │   └── EventBusRabbitMq/          # Message bus implementation
│   ├── Ordering/
│   │   ├── Ordering.API/              # Order management service
│   │   ├── Ordering.Application/      # Business logic
│   │   ├── Ordering.Core/             # Domain models
│   │   └── Ordering.Infrastructure/   # Data access
│   ├── Services/
│   │   └── AuthService/               # FastAPI authentication
│   │       ├── main.py                # FastAPI application
│   │       ├── requirements.txt       # Python dependencies
│   │       └── Dockerfile             # Container configuration
│   └── WebClient/
│       ├── TraditionalWebClient/      # ASP.NET Core MVC client
│       └── AngularWebClient/          # Modern Angular SPA
│           ├── src/
│           │   ├── app/
│           │   │   ├── core/          # Services, guards, interceptors
│           │   │   ├── features/      # Page components
│           │   │   ├── layouts/       # Header, footer
│           │   │   ├── shared/        # Common components
│           │   │   ├── app.routes.ts  # Route definitions
│           │   │   └── app.component.ts
│           │   ├── environments/      # Config files
│           │   ├── assets/            # Images, fonts
│           │   ├── index.html
│           │   ├── main.ts
│           │   └── styles.scss
│           ├── angular.json           # Angular CLI config
│           ├── tsconfig.json          # TypeScript config
│           ├── package.json           # NPM dependencies
│           ├── Dockerfile             # Container build
│           └── README.md              # Client-specific docs
├── DevAssets/
└── bin/
```

## 🔗 Service Communication

### Service Ports and Endpoints

| Service              | Port (Docker) | Port (Direct) | Protocol | Database    |
| -------------------- | ------------- | ------------- | -------- | ----------- |
| API Gateway (Ocelot) | 7000          | 7000          | HTTP     | N/A         |
| Catalog API          | 8000          | 8000          | HTTP     | MongoDB     |
| Cart API             | 8001          | 8001          | HTTP     | Redis       |
| Ordering API         | 8002          | 8002          | HTTP     | SQL Server  |
| FastAPI Auth         | 8010          | 8003          | HTTP     | In-Memory\* |
| Angular Client       | 3000          | 4200          | HTTP/WS  | N/A         |
| RabbitMQ             | 5672          | 5672          | AMQP     | N/A         |
| RabbitMQ Console     | 15672         | 15672         | HTTP     | N/A         |

\*Dev: In-memory dict, Prod: PostgreSQL/MongoDB recommended

### API Gateway Routes

The Ocelot Gateway aggregates services:

```
/api/catalog/* → Catalog Service (8000)
/api/cart/*    → Cart Service (8001)
/api/orders/*  → Ordering Service (8002)
/api/auth/*    → FastAPI Auth Service (8010)
```

## 📦 Technology Stack

### Backend Services (ASP.NET Core)

- **Framework**: ASP.NET Core 8.0
- **APIs**: RESTful Web APIs
- **Databases**: MongoDB, Redis, SQL Server
- **Message Bus**: RabbitMQ
- **API Gateway**: Ocelot

### Authentication Service (Python)

- **Framework**: FastAPI 0.104
- **Server**: Uvicorn ASGI
- **Security**: python-jose (JWT), passlib (Bcrypt)
- **Validation**: Pydantic

### Frontend (Angular)

- **Framework**: Angular 17
- **UI Library**: Angular Material 17
- **CSS Framework**: Bootstrap 5
- **Reactive**: RxJS 7.8
- **Language**: TypeScript 5.2
- **Styling**: SCSS

### DevOps

- **Containerization**: Docker & docker-compose
- **Orchestration**: Docker Compose
- **Monitoring**: RabbitMQ Management Console

## 🐳 Docker Deployment

### Build All Services

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean state)
docker-compose down -v
```

### Service Status

```bash
# Check running containers
docker-compose ps

# View specific service logs
docker-compose logs auth.api
docker-compose logs ocelotgateway
```

### Environment Variables

**Development** (`docker-compose.override.yml`):

```yaml
catalog.api:
  environment:
    - ASPNETCORE_ENVIRONMENT=Development
    - CatalogDbSettings:ConnectionString=mongodb://catalogdb:27017

cart.api:
  environment:
    - ASPNETCORE_ENVIRONMENT=Development
    - ConnectionStrings:Redis=cartdb:6379
    - EventBus:HostName=rabbitmq

auth.api:
  environment:
    - PYTHONUNBUFFERED=1
```

## 🏃 Local Development

### Angular Web Client

```bash
cd src/WebClient/AngularWebClient

# Install dependencies
npm install

# Start development server
ng serve
# Access: http://localhost:4200

# Production build
ng build --configuration production
```

### FastAPI Auth Service

```bash
cd src/Services/AuthService

# Create virtual environment
python -m venv venv
source venv/bin/activate          # macOS/Linux
venv\Scripts\activate              # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload --port 8003
# Access: http://localhost:8003/docs (Swagger UI)
```

### ASP.NET Core Services

```bash
# Build solution
dotnet build

# Run specific service
cd src/Ordering/Ordering.API
dotnet run

# Watch mode
dotnet watch run
```

## 🔒 Security Considerations

### Authentication Flow

1. User submits email/password on login page
2. FastAPI validates credentials and returns JWT token
3. Token stored in browser localStorage
4. HTTP interceptor automatically injects token in API requests
5. Backend validates token on protected endpoints
6. 401 response triggers automatic logout

### Protected Routes

Routes requiring authentication:

- `/checkout` - Requires valid JWT token
- `/confirmation` - Requires valid JWT token
- `/orders` - Requires valid JWT token

### CORS Configuration

FastAPI enables CORS for development:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Password Security

- Minimum 6 characters
- Hashed with bcrypt (cost factor 12)
- Never transmitted in plain text
- JWT tokens used for subsequent requests

## 🛠️ Development Workflow

### Adding a New Feature

1. **Backend API Endpoint**

   ```csharp
   // Add endpoint in ASP.NET Core service
   [HttpGet("endpoint")]
   public async Task<ActionResult> Endpoint() { }
   ```

2. **API Gateway Route**

   ```json
   {
     "DownstreamPathTemplate": "/api/service/endpoint",
     "DownstreamScheme": "http",
     "DownstreamHostAndPorts": [{ "Host": "service.api", "Port": 8000 }]
   }
   ```

3. **Angular Service**

   ```typescript
   getEndpoint(): Observable<Data> {
     return this.http.get<Data>(`${this.apiUrl}/endpoint`);
   }
   ```

4. **Angular Component**
   ```typescript
   ngOnInit() {
     this.service.getEndpoint().subscribe(data => {
       this.data = data;
     });
   }
   ```

## 🧪 Testing

### Running Tests

```bash
# Angular unit tests
cd src/WebClient/AngularWebClient
ng test

# ASP.NET Core tests
dotnet test

# API integration tests
# (FastAPI tests in src/Services/AuthService/tests/)
```

## 📊 Monitoring

### RabbitMQ Management Console

```
URL: http://localhost:15672
Username: guest
Password: guest
```

Monitor message queues and service communication.

## 🐛 Troubleshooting

### Services Won't Start

```bash
# Check port conflicts
lsof -i :3000              # macOS/Linux
netstat -ano | findstr 3000 # Windows

# Clear Docker cache
docker-compose down -v
docker system prune
docker-compose up --build
```

### Authentication Not Working

```bash
# Check if auth service is running
curl http://localhost:8010/health

# Verify token in browser
localStorage.getItem('access_token')

# Check browser console for CORS errors
```

### Database Connection Issues

```bash
# Verify MongoDB
docker-compose logs catalogdb

# Verify Redis
docker-compose logs cartdb

# Verify SQL Server
docker-compose logs orderdb
```

### API Gateway Not Routing Requests

```bash
# Check gateway logs
docker-compose logs ocelotgateway

# Verify service availability
curl http://localhost:7000/api/catalog/products
```

## 📝 API Documentation

### Swagger UI (When Running)

- **Ocelot Gateway**: http://localhost:7000/swagger
- **FastAPI Auth**: http://localhost:8010/docs
- **Catalog API**: http://localhost:8000/swagger
- **Cart API**: http://localhost:8001/swagger
- **Ordering API**: http://localhost:8002/swagger

## 📈 Performance Optimization

### Frontend

- Angular lazy loading for routes
- Production builds with ahead-of-time (AOT) compilation
- Bundle analysis and optimization

### Backend

- Entity Framework Core query optimization
- Caching layers (Redis for cart)
- Async/await patterns throughout

## 🚀 Production Deployment

### Kubernetes (Helm)

```bash
# Build production images
docker build -t myregistry/auth-api:1.0 src/Services/AuthService
docker build -t myregistry/angular-client:1.0 src/WebClient/AngularWebClient

# Push to registry
docker push myregistry/auth-api:1.0
docker push myregistry/angular-client:1.0

# Deploy with Helm or kubectl
kubectl apply -f k8s/
```

### Environment Variables for Production

```bash
ASPNETCORE_ENVIRONMENT=Production
DATABASE_CONNECTION_STRING=<prod-db-connection>
RABBITMQ_HOST=<prod-rabbitmq-host>
JWT_SECRET_KEY=<secure-random-key>
ALLOWED_ORIGINS=https://yourdomain.com
```

## 📚 Additional Resources

- [Angular Documentation](https://angular.io)
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Docker Documentation](https://docs.docker.com)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 💬 Support

For questions or issues:

1. Check [Troubleshooting](#-troubleshooting) section
2. Review Docker logs: `docker-compose logs`
3. Check browser DevTools console for client-side errors
4. Verify all services running: `docker-compose ps`

---

**Start the application with:** `docker-compose up --build`

**Access at:** http://localhost:3000

**Happy coding!** 🚀

**Port already in use?**

```bash
ng serve --port 4300
```

**API not connecting?**

- Check API Gateway is running on port 7000
- Verify environment configuration
- Check browser console for errors

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️✔️🍺 Happy Coding 👍😊
