# Database Setup Instructions

This document explains how to set up the authentication system for the health chatbot with Neon PostgreSQL.

## Prerequisites

- Neon PostgreSQL database created
- `DATABASE_URL` environment variable set in `.env.local`
- Access to your Neon dashboard

## Database Migration Steps

### Step 1: Create Authentication Tables

Run the following SQL migration file against your Neon database:

```bash
# Option 1: Using the local migration runner
pnpm db:migrate

# Option 2: Using Neon CLI or psql
psql $DATABASE_URL -f scripts/004_create_auth_tables.sql

# Option 3: Use your Neon dashboard's SQL Editor
# Copy the contents of scripts/004_create_auth_tables.sql and paste into the SQL Editor
```

### Step 2: (If Not Already Done) Create Health Chatbot Tables

Run the health chatbot schema:

```bash
psql $DATABASE_URL -f scripts/001_create_health_chatbot_tables.sql
```

### Step 3: Seed Health Data (Optional)

Add sample health topics and myth-busting content:

```bash
psql $DATABASE_URL -f scripts/002_seed_health_data.sql
```

## Database Schema Overview

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  display_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## API Endpoints

### POST `/api/sign-up`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "userId": "uuid-here"
}
```

**Errors:**
- `400`: Email or password missing
- `400`: Invalid email format
- `400`: Password less than 6 characters
- `409`: Email already registered
- `500`: Server error

### POST `/api/login`
Authenticate a user and create a session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "userId": "uuid-here",
  "sessionToken": "token-here"
}
```

Sets `sessionToken` as a secure HTTP-only cookie.

**Errors:**
- `400`: Email or password missing
- `401`: Invalid credentials
- `500`: Server error

### POST `/api/logout`
End user session and clear authentication cookie.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Security Notes

⚠️ **IMPORTANT**: The current implementation uses SHA-256 for password hashing. For production, replace with bcrypt:

```bash
npm install bcryptjs
# or
pnpm add bcryptjs
```

Update the API routes to use:
```typescript
import bcrypt from 'bcryptjs';

// Sign-up: Hash password
const passwordHash = await bcrypt.hash(password, 10);

// Login: Compare password
const isValidPassword = await bcrypt.compare(password, user.password_hash);
```

## Testing

### Test Sign-Up
```bash
curl -X POST http://localhost:3000/api/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Logout
```bash
curl -X POST http://localhost:3000/api/logout \
  -H "Cookie: sessionToken=your-token-here"
```

## Troubleshooting

### "User already exists" on first sign-up
Delete the migration file from your database or reset the database in Neon dashboard.

### "Invalid email or password" on login
Verify the email exists in the database: 
```sql
SELECT * FROM users WHERE email = 'your@email.com';
```

### Connection errors
Make sure `DATABASE_URL` is correctly set in `.env.local`:
```
DATABASE_URL=postgresql://user:password@host/dbname
```

## Next Steps

1. Run the migration script in Neon dashboard
2. Test the sign-up flow in the UI
3. Test the login flow in the UI
4. Replace SHA-256 with bcrypt for production security
5. Add JWT token support if needed
6. Consider adding email verification
