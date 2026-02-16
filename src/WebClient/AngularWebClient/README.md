# Modern Angular Web Client - E-Commerce Application

A professional, feature-rich e-commerce web application built with Angular 17, Material Design, and responsive Bootstrap 5 grid. The application provides a seamless shopping experience with product browsing, shopping cart management, secure checkout, and order history.

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (for containerized deployment)
- Node.js 18+ & npm (for local development)
- Angular CLI 17+

### Quick Start with Docker (Recommended)

Run the entire microservices stack with a single command:

```bash
# From the root workspace directory
docker-compose up --build

# Access the Angular web client
http://localhost:3000

# FastAPI Auth Service
http://localhost:8010

# Ocelot API Gateway
http://localhost:7000
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Access at http://localhost:4200
```

## 📋 Demo Credentials

Use these credentials to test the authentication system:

```
Email: demo@example.com
Password: secret
```

## ✨ Features

### 🏪 Shopping Features

- **Product Catalog** - Browse all products with filtering
- **Product Details** - View detailed product information with images
- **Shopping Cart** - Add/remove items, view cart
- **Checkout** - Multi-step secure checkout process
- **Order History** - View all previous orders
- **Order Confirmation** - Print-friendly order details

### 🔐 Authentication

- **User Registration** - Create new account with email/password validation
- **Secure Login** - JWT token-based authentication
- **Protected Routes** - Checkout and orders require authentication
- **Auto Logout** - Automatic logout on token expiration
- **Session Management** - Persistent login across browser sessions

### 💎 User Interface

- **Material Design** - Professional Google Material Design components
- **Responsive Layout** - Bootstrap 5 grid system for all devices
- **Dark Mode Ready** - Angular Material theming support
- **Smooth Interactions** - CSS transitions and animations
- **Form Validation** - Real-time error feedback

### 🛠️ Technical Architecture

- **Angular 17 Standalone Components** - Modern modern Angular approach
- **RxJS Reactive** - Observable-based state management
- **Material Design 17** - Enterprise UI components
- **Bootstrap 5** - Responsive grid and utilities
- **TypeScript 5.2** - Strict type safety
- **SCSS** - Component-scoped styling
- **HTTP Interceptors** - Centralized request/response handling
- **Route Guards** - Protected route access control

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Route access control
│   │   ├── interceptors/
│   │   │   └── http-config.interceptor.ts  # JWT token injection
│   │   ├── models/
│   │   │   └── models.ts              # Shared data models
│   │   └── services/
│   │       ├── auth.service.ts        # Authentication service
│   │       ├── catalog.service.ts     # Product catalog
│   │       ├── cart.service.ts        # Shopping cart
│   │       └── order.service.ts       # Orders
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login.component.*      # Login page
│   │   │   └── register.component.*   # Registration page
│   │   ├── home/                      # Home page
│   │   ├── products/                  # Product listing and details
│   │   ├── cart/                      # Shopping cart
│   │   ├── checkout/                  # Checkout process
│   │   ├── orders/                    # Order history and confirmation
│   │   └── contact/                   # Contact form
│   ├── layouts/
│   │   ├── header/                    # Navigation bar
│   │   └── footer/                    # Footer
│   ├── shared/
│   │   └── shared.module.ts           # Material components
│   ├── app.component.*                # Root component
│   ├── app.routes.ts                  # Route definitions
│   └── main.ts                        # Bootstrap
├── assets/                            # Images and static files
├── environments/                      # Environment configs
├── index.html                         # HTML entry point
└── styles.scss                        # Global styles
```

## 🔗 API Integration

The application connects to multiple backend services through the Ocelot API Gateway:

### Authentication Service (FastAPI)

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Verify Token**: `POST /api/auth/verify`
- **Current User**: `GET /api/auth/me`
- **Logout**: `POST /api/auth/logout`

### Catalog Service

- **Get Products**: `GET /api/catalog/products`
- **Product Details**: `GET /api/catalog/products/{id}`

### Cart Service

- **Get Cart**: `GET /api/cart/{username}`
- **Update Cart**: `POST /api/cart`

### Ordering Service

- **Create Order**: `POST /api/orders`
- **Get Orders**: `GET /api/orders/{username}`

## 🔐 Security Features

### JWT Authentication

- Tokens stored securely in localStorage
- Automatic token injection in API requests
- Token expiration handling
- Automatic logout on 401 Unauthorized

### Protected Routes

- `/checkout` - Requires authentication
- `/confirmation` - Requires authentication
- `/orders` - Requires authentication

### InputValidation

- Email format validation
- Password strength requirements
- Form field required validation
- Real-time error messages

## 🐳 Docker Deployment

### Build and Run

```bash
# Build specific image
docker build -t angularwebclient:latest .

# Run container
docker run -p 3000:3000 angularwebclient:latest

# Run entire stack
docker-compose up --build
```

### Service Ports

| Service            | Port | Container            |
| ------------------ | ---- | -------------------- |
| Angular Web Client | 3000 | angularwebclient     |
| Angular Dev Server | 4200 | localhost            |
| FastAPI Auth       | 8010 | authapi              |
| Ocelot Gateway     | 7000 | ocelotgateway        |
| Catalog API        | 8000 | catalogapi           |
| Cart API           | 8001 | cartapi              |
| Ordering API       | 8002 | orderingapi          |
| Traditional Client | 8003 | traditionalwebclient |

## 📦 Dependencies

### Core

- `@angular/core@17` - Framework
- `@angular/material@17` - Material Design components
- `@angular/cdk@17` - Angular Component Dev Kit
- `bootstrap@5` - CSS framework
- `rxjs@7.8` - Reactive programming

### Build & Development

- `typescript@5.2` - Type checking
- `@angular-eslint/eslint-plugin` - Linting
- `sass@1.68` - CSS preprocessing

## 🧪 Testing & Development

### Development Server

```bash
# Start dev server with hot reload
ng serve

# Navigate to http://localhost:4200
# The app auto-reloads when files change
```

### Build for Production

```bash
# Production build with optimization
ng build --configuration production

# Output in dist/ directory
```

### Linting

```bash
# Check code style
ng lint
```

## 🔧 Configuration

### Environment Variables

**Development** (`environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:7000",
};
```

**Production** (`environments/environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  apiUrl: "https://api.yourdomain.com",
};
```

### Material Theme

Customize in `styles.scss`:

```scss
@import "@angular/material/prebuilt-themes/indigo-pink.css";
// Or other Material themes available
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux

# Windows: Use Task Manager or
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Authentication Issues

- Clear localStorage: Open DevTools → Application → LocalStorage → Clear
- Check token: `localStorage.getItem('access_token')`
- Verify FastAPI service is running on port 8010

### CORS Errors

- FastAPI has CORS enabled for all origins (demo only)
- For production, configure specific origins in backend

### Docker Build Fails

```bash
# Clean build cache
docker-compose down
docker system prune
docker-compose up --build
```

## 📝 API Response Formats

### Successful Authentication

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "email": "demo@example.com",
    "full_name": "Demo User"
  }
}
```

### Error Response

```json
{
  "detail": "Invalid credentials"
}
```

## 🚀 Production Deployment

### Preparing for Production

1. **Build the application**:

   ```bash
   ng build --configuration production
   ```

2. **Optimize Docker image**:

   ```bash
   docker build -t angularwebclient:prod --target production .
   ```

3. **Environment variables**:
   - Set `API_URL` to production API endpoint
   - Configure CORS in backend

4. **Serve with production server**:
   - Use nginx or similar reverse proxy
   - Enable HTTPS
   - Configure caching headers

## 📚 Additional Resources

- [Angular Documentation](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file in the root directory for details.

## 🤝 Support

For issues or questions:

1. Check troubleshooting section above
2. Review demo credentials and API endpoints
3. Verify all services are running: `docker-compose ps`
4. Check browser console for detailed error messages

---

**Happy Shopping!** 🛍️
