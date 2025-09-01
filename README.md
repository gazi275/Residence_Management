
# Backend Starter

## Overview
Backend Starter is a scalable, modular Node.js/TypeScript backend boilerplate with Express, Prisma (MongoDB), JWT authentication, file upload, dynamic query, and auto-generated Swagger documentation. Designed for rapid API development and production-ready deployment.

## Features
- Built with **Node.js** and **TypeScript**
- Modular structure with auto module & Swagger doc generation
- **Express.js** RESTful API
- **MongoDB** (via Prisma ORM)
- **JWT authentication** & role-based access
- File upload (DigitalOcean Spaces/S3 compatible)
- Dynamic query, filtering, pagination
- Real-time WebSocket support
- **Swagger (OpenAPI)** auto documentation
- ESLint, Prettier, and Husky for code quality

## Installation
### Prerequisites
- Node.js (>= 18.x)
- npm or yarn
- MongoDB (local/cloud)
- DigitalOcean Spaces or AWS S3 (for file upload)

### Setup
1. Clone the repository:
   ```sh
   git clone <repo-url> backend-starter
   cd backend-starter
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in all required values.
4. Generate Prisma client and push schema:
   ```sh
   npm run gen
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```

## Scripts
| Command                | Description                        |
|------------------------|------------------------------------|
| `npm run dev`          | Start development server           |
| `npm run build`        | Build the project for production   |
| `npm start`            | Run the built application          |
| `npm run lint`         | Lint code with ESLint              |
| `npm run gen`          | Prisma generate & db push          |
| `npm run cModule`      | Generate a new module (CLI)        |
| `npm run genDoc`       | Generate Swagger doc for a module  |

## Folder Structure
```
src/
  app/
    modules/
    middleware/
    helper/
    error/
    route/
  config/
  shared/
  utils/
  app.ts
  server.ts
prisma/
  schema.prisma
scripts/
  generateModule.js
  generateSwaggerDoc.js
  templates/

.env
package.json

README.md
```

## API Documentation

- Swagger UI: [http://localhost:PORT/api-docs](http://localhost:PORT/api-docs)

## License

MIT

