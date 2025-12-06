# Next.js + Prisma + MongoDB Project

A full-stack web application built with Next.js 16, Prisma ORM, and MongoDB. This project includes user management features with a clean, modern UI using Tailwind CSS.

## Features

- 🚀 **Next.js 16** with App Router
- 🗄️ **Prisma ORM** for database management
- 🍃 **MongoDB** as the database
- 🎨 **Tailwind CSS 4** for styling
- 🐳 **Docker** support for local development
- 📝 **TypeScript** for type safety
- ✅ **ESLint** for code quality

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Docker** and **Docker Compose** (for local database)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-prisma
```

### 2. Install Dependencies

```bash
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

The default configuration should work for local development:

```env
PORT=3223
MONGO_URI=mongodb://localhost:27017/ir_db?directConnection=true
DATABASE_URL=${MONGO_URI}
```

### 4. Generate Prisma Client

Generate the Prisma client from your schema:

```bash
pnpm dev:prisma
```

Or manually:

```bash
pnpm prisma generate
```

### 5. Start Development Server

Start both the database and Next.js development server:

```bash
pnpm dev
```

This command will:
- Start MongoDB using Docker Compose
- Launch the Next.js development server on `http://localhost:3000`

The application will be available at [http://localhost:3000](http://localhost:3000)

This command will:
- Start MongoDB using Docker Compose
- Launch the Next.js development server on `http://localhost:3000`

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
next-prisma/
├── app/                    # Next.js App Router pages
│   ├── users/             # User management pages
│   │   ├── create/        # Create user form
│   │   ├── page.tsx       # Users list page
│   │   └── DeleteButton.tsx
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── service/               # Business logic layer
│   ├── actions/           # Server actions
│   ├── config/            # Configuration files
│   ├── models/            # Data models
│   └── repositories/      # Database repositories
├── prisma/                # Prisma configuration
│   ├── schema/            # Prisma schema files
│   │   └── user.prisma    # User model
│   └── schema.prisma      # Main Prisma config
├── docker-compose.yml     # Docker configuration
├── .env.example           # Environment variables template
└── package.json           # Project dependencies
```

## Available Scripts

- **`pnpm dev`** - Start development server with database
- **`pnpm dev:prisma`** - Generate Prisma client
- **`pnpm build`** - Build production bundle
- **`pnpm start`** - Start production server
- **`pnpm lint`** - Run ESLint

## Prisma Commands

### Generate Client

```bash
pnpm postinstall
```

or

```bash
pnpm prisma generate
```

### Run Migrations (Development)

```bash
pnpm prisma db push
```

### Open Prisma Studio

View and edit your database in a GUI:

```bash
pnpm prisma studio
```

### Reset Database

⚠️ Warning: This will delete all data!

```bash
pnpm prisma db push --force-reset
```

## Building for Production

### 1. Build the Application

```bash
pnpm build
```

This will:
- Generate Prisma client (via postinstall hook)
- Create an optimized production build

### 2. Test Production Build Locally

```bash
pnpm start
```

The production server will run on `http://localhost:3000`

## Deployment

### Environment Variables

Ensure the following environment variables are set in your production environment:

```env
DATABASE_URL=mongodb://<username>:<password>@<host>:<port>/<database>?retryWrites=true&w=majority
PORT=3000
```
