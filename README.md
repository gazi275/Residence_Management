# Residence Management Backend API

A comprehensive, production-ready backend system for managing residential properties, built with Node.js, TypeScript, Express, and Prisma ORM. This platform enables property managers, residents, and administrators to efficiently manage residences, appointments, issue reports, communications, and more.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Role-Based Access Control](#role-based-access-control)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Modules](#api-modules)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [File Upload & Storage](#file-upload--storage)
- [Real-Time Features](#real-time-features)
- [API Documentation](#api-documentation)
- [Development Tools](#development-tools)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

The **Residence Management Backend** is a comprehensive REST API designed for managing residential properties, tenants, staff, and administrative operations. It provides a complete solution for:

- Property and residence management
- User authentication and authorization with role-based permissions
- Issue tracking and maintenance requests
- Appointment scheduling with property managers
- News and announcements (both admin-wide and residence-specific)
- Real-time chat and notifications
- Emergency and property contact management
- Document and media storage
- Reporting and analytics

Perfect for property management companies, residential complexes, apartment buildings, and housing communities.

---

## 🛠 Tech Stack

### Core Technologies
- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

### Key Libraries & Tools
- **Validation**: Zod
- **File Upload**: Multer, Multer-S3
- **Storage**: AWS S3 / DigitalOcean Spaces
- **Email**: Nodemailer
- **SMS**: Twilio
- **Payment**: Stripe
- **Real-time**: WebSocket (ws)
- **Push Notifications**: Firebase Admin SDK
- **API Documentation**: Swagger/OpenAPI (swagger-jsdoc, swagger-ui-express)
- **Security**: bcrypt, CORS
- **Logging**: Morgan
- **Caching**: node-cache
- **Code Quality**: ESLint, Prettier

---

## ✨ Key Features

### 🏢 Residence Management
- Create and manage multiple residential properties
- Track property details (name, type, units, location, documents)
- Generate unique residence codes for easy joining
- Residence-specific news and announcements
- Document upload and management

### 👥 User Management
- User registration and authentication
- Profile management with image upload
- Role-based access control (5 roles)
- User status management (Pending, Active, Blocked)
- Social login support
- Password reset with OTP verification

### 🔐 Authentication & Security
- JWT-based authentication
- Email OTP verification
- Password reset functionality
- Secure password hashing with bcrypt
- Role-based route protection
- Token refresh mechanism

### 🐛 Issue Tracking & Reporting
- Create and categorize issue types
- Submit issue reports with images
- Assign issues to staff members
- Track issue status (Pending, In Progress, Resolved, Rejected)
- Add notes and updates to issues

### 📅 Appointment System
- Schedule appointments with property managers
- Appointment status tracking (Pending, Approved, Rejected, Completed)
- View appointment history
- Manage availability

### 📰 News & Announcements
- **Admin News**: System-wide announcements from super admins
- **Residence News**: Property-specific news from managers
- Support for images, videos, and thumbnails
- News categorization and filtering

### 💬 Real-Time Communication
- One-on-one chat between users
- Chat rooms with message history
- Image sharing in messages
- Read receipts
- Real-time WebSocket connections

### 🔔 Notifications
- Push notifications via Firebase Cloud Messaging (FCM)
- In-app notification center
- Read/unread status tracking
- Notification history

### 📞 Contact Management
- **Property Contacts**: Store contact information for various professionals (contractors, plumbers, electricians, etc.)
- **Emergency Contacts**: Quick access to emergency services

### 📊 Reporting System
- User-submitted reports and feedback
- Contact forms with user details

### 📁 File Management
- Upload profile images
- Upload issue photos
- Store residence documents
- S3/DigitalOcean Spaces integration
- Local upload support for development

### 🔍 Advanced Querying
- Dynamic query building
- Filtering and sorting
- Pagination support
- Search functionality

---

## 🔒 Role-Based Access Control

The system implements a comprehensive role-based permission system with 5 distinct roles:

### 1. **USER** (Resident)
**What they can do:**
- Create account and manage profile
- Join residences using unique codes
- View residence-specific news
- Submit issue reports
- Book appointments with property managers
- View and update their appointments
- Access emergency and property contacts
- Send and receive messages via chat
- Receive notifications
- Submit general reports/feedback
- Change password and update profile information

**What they CANNOT do:**
- Manage other users
- Create or manage residences
- Assign issues to staff
- Create news or announcements
- Access admin-level features

### 2. **CARETAKER** (Maintenance Staff)
**What they can do:**
- All USER permissions, plus:
- View assigned issue reports
- Update issue status and add notes
- Manage maintenance requests
- Communicate with residents about issues
- Access property contact information

**What they CANNOT do:**
- Create residences
- Manage users (except updating issue assignments given to them)
- Delete data
- Access financial/admin features

### 3. **MANAGER** (Property Manager)
**What they can do:**
- All CARETAKER permissions, plus:
- Create and manage residences
- Create residence-specific news
- Approve/reject residence join requests
- Manage appointments (approve/reject)
- Assign issues to caretakers
- View all issues for their properties
- Manage property and emergency contacts
- Add users to residences

**What they CANNOT do:**
- Access super admin features
- Manage admin-level news
- Delete other managers or admins

### 4. **ADMIN**
**What they can do:**
- All MANAGER permissions, plus:
- View all users across all residences
- Update user information and status
- Block/unblock users
- Delete users (except SUPER_ADMIN)
- Create admin-wide news/announcements
- Access all residences and reports
- Manage all issue types
- Full access to analytics and reports

**What they CANNOT do:**
- Perform certain super admin operations (if super admin features exist)

### 5. **SUPER_ADMIN**
**What they can do:**
- **Full system access** - unrestricted permissions
- All ADMIN permissions, plus:
- Manage admins and all users
- Delete any content
- Access system-wide configurations
- Database management operations
- Full control over all modules

**Special Powers:**
- Cannot be deleted by other users
- Has access to all API endpoints
- Can override any restrictions

### Role Hierarchy

```
SUPER_ADMIN (Highest Authority)
    ↓
  ADMIN
    ↓
 MANAGER
    ↓
CARETAKER
    ↓
  USER (Basic Access)
```

### Permission Examples by Module

| Module | USER | CARETAKER | MANAGER | ADMIN | SUPER_ADMIN |
|--------|------|-----------|---------|-------|-------------|
| Own Profile | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R/W | ✅ R/W |
| All Users | ❌ | ❌ | ❌ | ✅ R/W | ✅ R/W/D |
| Residences | ✅ View | ✅ View | ✅ CRUD | ✅ All | ✅ All |
| Issue Reports | ✅ Create | ✅ Update | ✅ Assign | ✅ All | ✅ All |
| Appointments | ✅ Create | ✅ View | ✅ Approve | ✅ All | ✅ All |
| Admin News | ❌ | ❌ | ❌ | ✅ CRUD | ✅ CRUD |
| Residence News | ✅ View | ✅ View | ✅ CRUD | ✅ All | ✅ All |

*Legend: R = Read, W = Write, D = Delete, CRUD = Create/Read/Update/Delete*

---

## 📂 Project Structure

```
evans-jr-backend/
│
├── prisma/
│   └── schema.prisma              # Database schema definitions
│
├── scripts/
│   ├── generateModule.js          # CLI tool to generate new modules
│   ├── generateSwaggerDoc.js      # Auto-generate Swagger documentation
│   ├── templates/                 # Module templates
│   │   ├── controller.template.js
│   │   ├── service.template.js
│   │   ├── route.template.js
│   │   ├── validation.template.js
│   │   ├── doc.template.js
│   │   └── constants.template.js
│   └── utils/
│       └── helpers.js
│
├── src/
│   ├── app.ts                     # Express app configuration
│   ├── server.ts                  # Server entry point
│   │
│   ├── app/
│   │   ├── DB/
│   │   │   └── PrismaConnection.ts    # Prisma client setup
│   │   │
│   │   ├── error/
│   │   │   └── ApiErrors.ts           # Custom error classes
│   │   │
│   │   ├── helper/                    # Utility functions
│   │   │   ├── createStripeConnectAccount.ts
│   │   │   ├── createStripeCustomerAcc.ts
│   │   │   ├── deleteFile.ts
│   │   │   ├── firebaseAdmin.ts       # Firebase Admin SDK setup
│   │   │   ├── jwtHelper.ts           # JWT token operations
│   │   │   ├── OTPFn.ts               # OTP generation
│   │   │   ├── OTPVerify.ts           # OTP verification
│   │   │   ├── pagination.ts          # Pagination helper
│   │   │   ├── queryBuilder.ts        # Dynamic query builder
│   │   │   ├── S3.ts                  # S3 upload operations
│   │   │   ├── sendMailFn.ts          # Email sending
│   │   │   ├── sendSms.ts             # SMS via Twilio
│   │   │   ├── StripeConnectAccEmail.ts
│   │   │   ├── subscriptionController.ts
│   │   │   └── uploadFile.ts          # File upload handler
│   │   │
│   │   ├── interface/
│   │   │   └── index.ts               # TypeScript interfaces
│   │   │
│   │   ├── middleware/                # Express middlewares
│   │   │   ├── auth.ts                # JWT authentication middleware
│   │   │   ├── globalErrorHandler.ts  # Centralized error handler
│   │   │   ├── parseBodyData.ts       # Parse multipart form data
│   │   │   ├── sendResponse.ts        # Standardized response format
│   │   │   └── validateRequest.ts     # Zod validation middleware
│   │   │
│   │   ├── modules/                   # Feature modules
│   │   │   ├── auth/                  # Authentication
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.validation.ts
│   │   │   │   └── auth.doc.ts
│   │   │   │
│   │   │   ├── user/                  # User management
│   │   │   ├── Residences/            # Residence/property management
│   │   │   ├── IssueType/             # Issue categories
│   │   │   ├── IssueReport/           # Issue tracking
│   │   │   ├── Appointment/           # Appointment scheduling
│   │   │   ├── News/                  # Residence news
│   │   │   ├── AdminNews/             # Admin announcements
│   │   │   ├── PropertyContact/       # Property contacts
│   │   │   ├── EmergencyContact/      # Emergency contacts
│   │   │   ├── notifications/         # Notification management
│   │   │   ├── Report/                # General reports
│   │   │   └── Upload/                # File upload endpoints
│   │   │
│   │   ├── route/
│   │   │   └── route.ts               # Central route registry
│   │   │
│   │   └── utils/
│   │       └── multer.ts              # Multer configuration
│   │
│   ├── config/
│   │   ├── index.ts                   # Environment config
│   │   ├── serviceAccount.ts          # Firebase service account
│   │   ├── stripe.ts                  # Stripe configuration
│   │   └── swaggerConfig.ts           # Swagger/OpenAPI setup
│   │
│   ├── shared/
│   │   └── catchAsync.ts              # Async error wrapper
│   │
│   ├── socket/
│   │   └── setupWebSocket.ts          # WebSocket configuration
│   │
│   └── utils/
│       ├── handlePrismaValidation.ts  # Prisma error handler
│       ├── handleZodError.ts          # Zod error formatter
│       ├── prisma.ts                  # Prisma client instance
│       ├── stripe.ts                  # Stripe utilities
│       └── stripeOneTime.ts           # One-time payment helper
│
├── uploads/                           # Local file storage (dev)
│
├── .env                               # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json                      # TypeScript configuration
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**

### Step-by-Step Installation

1. **Clone the repository**

```bash
git clone https://github.com/gazi275/Residence_Management.git
cd evans-jr-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section below)

4. **Generate Prisma Client and sync database**

```bash
npm run gen
```

This command will:
- Generate the Prisma Client
- Push the schema to your MongoDB database

5. **Start the development server**

```bash
npm run dev
```

The server will start on `http://localhost:6006` (or your configured PORT)

6. **Access API documentation**

Open your browser and navigate to:
```
http://localhost:6006/api-docs
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=6006
NODE_ENV=development
CLIENT_NAME="Residence Management"

# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/residence_management?retryWrites=true&w=majority"

# JWT Authentication
TOKEN_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRES_IN=7d

# AWS S3 / DigitalOcean Spaces (for file uploads)
DO_SPACE_ENDPOINT=https://nyc3.digitaloceanspaces.com
DO_SPACE_ACCESS_KEY=your_spaces_access_key
DO_SPACE_SECRET_KEY=your_spaces_secret_key
DO_SPACE_BUCKET=your_bucket_name

# Stripe Payment (optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Nodemailer)
MAIL_PASS=your_gmail_app_password

# SMS (Twilio) - optional
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM=+1234567890

# Firebase Admin SDK (for push notifications)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

### Important Notes:
- Replace all placeholder values with your actual credentials
- **Never commit `.env` file to version control**
- For production, use environment variables from your hosting provider
- `MAIL_PASS` for Gmail requires an [App Password](https://support.google.com/accounts/answer/185833)

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server with hot reload (ts-node-dev) |
| **Build** | `npm run build` | Compile TypeScript to JavaScript in `dist/` folder |
| **Production** | `npm start` | Run compiled production build |
| **Linting** | `npm run lint` | Check code for linting errors |
| **Lint Fix** | `npm run lint:fix` | Automatically fix linting errors |
| **Format** | `npm run prettier` | Format code with Prettier |
| **Format Fix** | `npm run prettier:fix` | Auto-format all files |
| **Database** | `npm run gen` | Generate Prisma Client & push schema to DB |
| **Create Module** | `npm run cModule` | Generate new module scaffolding (interactive) |
| **Generate Docs** | `npm run genDoc` | Generate Swagger documentation for a module |
| **Test** | `npm test` | Run tests (placeholder - add your test framework) |

### Development Workflow

```bash
# Start development
npm run dev

# In another terminal, create a new module
npm run cModule

# Generate Swagger docs for the new module
npm run genDoc

# Before committing
npm run lint:fix
npm run prettier:fix
```

---

## 📡 API Modules

The API is organized into the following modules:

### 1. **Authentication** (`/api/v1/auth`)
- `POST /login` - User login with email/password
- `POST /verify-otp` - Verify OTP after registration
- `POST /forget-password` - Request password reset
- `POST /forget-otp-verify` - Verify OTP for password reset
- `POST /reset-password` - Reset password with token
- `POST /resend-otp` - Resend OTP
- `POST /social` - Social login (Google, Facebook, etc.)

### 2. **User Management** (`/api/v1/users`)
- `POST /` - Create new user (registration)
- `GET /me` - Get current user profile (authenticated)
- `GET /` - Get all users (Admin/Super Admin only)
- `GET /:id` - Get single user by ID (Admin only)
- `PUT /me` - Update own profile with image upload
- `PUT /change-password` - Change password
- `PATCH /:id` - Update user by admin
- `DELETE /:id` - Delete user (Admin/Super Admin)

### 3. **Residences** (`/api/v1/residences`)
- `POST /` - Create new residence (Manager+)
- `GET /` - Get all residences
- `GET /:id` - Get residence by ID
- `PUT /:id` - Update residence
- `DELETE /:id` - Delete residence
- `POST /join` - Join residence with code
- `GET /my-residences` - Get residences user has joined
- `PATCH /approve-join/:id` - Approve join request (Manager)

### 4. **Issue Types** (`/api/v1/issue`)
- `POST /` - Create issue type (Admin+)
- `GET /` - Get all issue types
- `GET /:id` - Get issue type by ID
- `PUT /:id` - Update issue type
- `DELETE /:id` - Delete issue type

### 5. **Issue Reports** (`/api/v1/issues-report`)
- `POST /` - Create issue report (with images)
- `GET /` - Get all issue reports
- `GET /my-issues` - Get user's own issues
- `GET /:id` - Get issue report by ID
- `PATCH /:id/assign` - Assign issue to staff (Manager+)
- `PATCH /:id/status` - Update issue status
- `PUT /:id` - Update issue report
- `DELETE /:id` - Delete issue report

### 6. **Appointments** (`/api/v1/appointment`)
- `POST /` - Create appointment
- `GET /` - Get all appointments
- `GET /my-appointments` - Get user's appointments
- `GET /:id` - Get appointment by ID
- `PATCH /:id/approve` - Approve appointment (Manager+)
- `PATCH /:id/reject` - Reject appointment
- `PATCH /:id/complete` - Mark as completed
- `DELETE /:id` - Delete appointment

### 7. **Residence News** (`/api/v1/news`)
- `POST /` - Create residence news (Manager+)
- `GET /` - Get all news (filtered by residence)
- `GET /:id` - Get news by ID
- `PUT /:id` - Update news
- `DELETE /:id` - Delete news

### 8. **Admin News** (`/api/v1/admin-news`)
- `POST /` - Create admin-wide news (Admin+)
- `GET /` - Get all admin news
- `GET /:id` - Get admin news by ID
- `PUT /:id` - Update admin news
- `DELETE /:id` - Delete admin news

### 9. **Property Contacts** (`/api/v1/property-contact`)
- `POST /` - Add property contact
- `GET /` - Get all property contacts
- `GET /:id` - Get contact by ID
- `PUT /:id` - Update contact
- `DELETE /:id` - Delete contact

### 10. **Emergency Contacts** (`/api/v1/emergency-contact`)
- `POST /` - Add emergency contact
- `GET /` - Get all emergency contacts
- `GET /:id` - Get contact by ID
- `PUT /:id` - Update contact
- `DELETE /:id` - Delete contact

### 11. **File Upload** (`/api/v1/upload`)
- `POST /image` - Upload single image
- `POST /images` - Upload multiple images
- `POST /document` - Upload document
- `DELETE /file/:key` - Delete file from S3

### 12. **Notifications** (`/api/v1/notifications`)
- `GET /` - Get user's notifications
- `GET /:id` - Get notification by ID
- `PATCH /:id/read` - Mark as read
- `DELETE /:id` - Delete notification

### 13. **Reports/Feedback** (`/api/v1/reports`)
- `POST /` - Submit report/feedback
- `GET /` - Get all reports (Admin)

---

## 🗄 Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

### Core Models

- **User** - User accounts with role-based access
- **Otp** - OTP verification codes
- **Residences** - Property/residence information
- **ResidenceUser** - Many-to-many relationship (users ↔ residences)

### Feature Models

- **IssueType** - Categories for issues (plumbing, electrical, etc.)
- **IssueReport** - Maintenance/issue reports
- **Appointment** - Appointment bookings
- **News** - Residence-specific news
- **AdminNews** - System-wide announcements
- **PropertyContact** - Contact directory
- **EmergencyContact** - Emergency services
- **Report** - User feedback/reports
- **Notifications** - Push notifications
- **Chat** - Chat messages
- **Room** - Chat rooms

### Enums

- **Role**: `USER`, `CARETAKER`, `MANAGER`, `ADMIN`, `SUPER_ADMIN`
- **Status**: `PENDING`, `ACTIVE`, `BLOCKED`
- **issueStatus**: `PENDING`, `IN_PROGRESS`, `RESOLVED`, `REJECTED`
- **appointmentsStatus**: `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`
- **JoinStatus**: `PENDING`, `APPROVED`, `REJECTED`

For complete schema, see `prisma/schema.prisma`

---

## 🔐 Authentication & Security

### JWT Authentication

The application uses JWT (JSON Web Tokens) for stateless authentication:

1. **Login**: User provides email/password → receives JWT token
2. **Protected Routes**: Token sent in `Authorization` header
3. **Verification**: Middleware verifies token and extracts user info
4. **Role Check**: Routes protected by role-based middleware

### Token Usage

```http
Authorization: Bearer your_jwt_token_here
```

### Password Security

- Passwords hashed using **bcrypt**
- Minimum password requirements enforced
- Password reset via OTP (email/SMS)

### OTP Verification

- OTP sent via email (Nodemailer)
- 5-minute expiry
- Used for account verification and password reset

### Security Best Practices

✅ Environment variables for secrets  
✅ CORS configuration  
✅ Input validation with Zod  
✅ SQL injection prevention (Prisma)  
✅ Error handling without exposing stack traces  
✅ Rate limiting (can be added)  
✅ Helmet.js for HTTP headers (can be added)

---

## 📤 File Upload & Storage

### Upload Destinations

- **Development**: Local `uploads/` folder
- **Production**: AWS S3 / DigitalOcean Spaces

### Supported Operations

- Profile image upload
- Issue report images (multiple)
- Residence documents
- News thumbnails and media
- Chat images

### File Types

- **Images**: JPG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX
- **Videos**: MP4, MOV (for news)

### Implementation

```typescript
// Example: Upload profile image
PUT /api/v1/users/me
Content-Type: multipart/form-data

{
  "image": [file],
  "name": "John Doe"
}
```

Files are uploaded to S3-compatible storage and URLs stored in database.

---

## ⚡ Real-Time Features

### WebSocket Support

Located in `src/socket/setupWebSocket.ts` (implementation details in code)

### Real-Time Features

- **Chat**: One-on-one messaging between users
- **Notifications**: Real-time push notifications
- **Status Updates**: Online/offline user status
- **Issue Updates**: Real-time issue status changes

### Firebase Cloud Messaging (FCM)

- Push notifications to mobile devices
- Configured via Firebase Admin SDK
- Requires `fcmToken` stored in user profile

---

## 📚 API Documentation

### Swagger/OpenAPI

The API is fully documented using Swagger/OpenAPI 3.0

**Access Swagger UI:**
```
http://localhost:5000/api-docs
```

**Get JSON spec:**
```
http://localhost:5000/v2/api-docs
```

### Auto-Generation

Generate Swagger docs for a module:
```bash
npm run genDoc
```

Follow prompts to select module and generate documentation.

---

## 🧰 Development Tools

### Module Generator

Quickly scaffold new modules with:

```bash
npm run cModule
```

This generates:
- Controller
- Service
- Routes
- Validation (Zod)
- Swagger documentation
- Constants file

### Code Quality

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety

### Logging

- **Morgan**: HTTP request logging in development

### Caching

- **node-cache**: In-memory caching (TTL: 300s)

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Compiled files will be in `dist/` folder.

### Start Production Server

```bash
npm start
```

### Deployment Platforms

Recommended platforms:
- **AWS EC2** with PM2
- **Heroku**
- **DigitalOcean Droplets**
- **Railway**
- **Render**
- **Google Cloud Platform**

### Environment Setup

1. Set all environment variables on your hosting platform
2. Ensure MongoDB connection string is correct
3. Configure S3/Spaces for file uploads
4. Set `NODE_ENV=production`
5. Use process managers like **PM2** or **Forever**

### PM2 Example

```bash
npm install -g pm2
npm run build
pm2 start dist/server.js --name residence-api
pm2 save
pm2 startup
```

### Docker (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t residence-backend .
docker run -p 5000:5000 --env-file .env residence-backend
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run linting and formatting**
   ```bash
   npm run lint:fix
   npm run prettier:fix
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: Your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Code Standards

- Follow existing code structure
- Use TypeScript types
- Add Zod validation for new endpoints
- Document APIs with Swagger comments
- Write meaningful commit messages

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 📞 Support

For questions, issues, or feature requests:

- **GitHub Issues**: [Create an issue](https://github.com/gazi275/Residence_Management/issues)
- **Email**: gaziazad270@gmail.com

---

## 🙏 Acknowledgments

- Built with ❤️ using Express.js and TypeScript
- Database powered by MongoDB and Prisma
- File storage via AWS S3 / DigitalOcean Spaces
- Real-time features with WebSocket
- API documentation with Swagger/OpenAPI

---

**Made with 💻 by the Residence Management Team**
