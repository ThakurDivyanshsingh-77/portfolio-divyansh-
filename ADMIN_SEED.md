# Admin Seed Configuration

## Overview

This project uses **environment variable-based authentication** for admin credentials. The admin user credentials are stored in the `.env` file and loaded at runtime.

## Current Admin Credentials

```
Username: admin
Password: admin123
```

## File Locations

- **Configuration**: [.env](./.env)
- **API Route**: [src/app/api/admin/login/route.js](./src/app/api/admin/login/route.js)
- **Auth Utilities**: [src/lib/adminAuth.js](./src/lib/adminAuth.js)

## How It Works

1. **Environment Variables** (`.env`):
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

2. **Login API** (`/api/admin/login`):
   - Accepts POST requests with JSON body: `{ "username": "admin", "password": "admin123" }`
   - Returns a JWT token if credentials match
   - Token is used for subsequent authenticated requests

3. **Token Generation**:
   - Located in `src/lib/adminAuth.js`
   - Creates JWT tokens for authenticated sessions

## Setup Instructions

### 1. Initialize Admin Seed

Run the seed initialization script:

```bash
node util/init-admin-seed.js
```

This validates that the admin credentials are properly configured.

### 2. Change Admin Credentials

To change the admin credentials:

1. Open `.env` file
2. Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Restart the development server

Example:
```
ADMIN_USERNAME=my_admin
ADMIN_PASSWORD=my_secure_password_123
```

⚠️ **Production Security Note**: 
- Use strong passwords (minimum 12 characters)
- Include uppercase, lowercase, numbers, and special characters
- Never commit `.env` with real credentials to version control
- Use `.env.local` for local development

### 3. Login to Admin Dashboard

1. Navigate to `/admin`
2. Use the credentials to login
3. A JWT token will be stored in your session

## API Usage

### Login Endpoint

**POST** `/api/admin/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

## Future: Database-Backed Authentication

If you want to migrate to database-backed authentication:

1. Use the template provided in `src/models/Admin.example.js`
2. Implement password hashing using bcrypt
3. Update the login route to query the MongoDB database
4. Create a seed script to initialize admin users in the database

See `src/models/Admin.example.js` for the schema template.

## Environment Variables Reference

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `ADMIN_USERNAME` | string | Admin login username | `admin` |
| `ADMIN_PASSWORD` | string | Admin login password | `admin123` |
| `MONGODB_URI` | string | MongoDB connection string | `mongodb+srv://...` |
| `GROQ_API_KEY` | string | Groq API key for chat | `gsk_...` |

## Troubleshooting

### "Admin credentials not configured"
- Check that `.env` file exists
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Restart the development server

### Login failing with valid credentials
- Ensure `.env` file is in the project root
- Check that environment variables are properly loaded
- Look for typos in username/password in `.env`

## Security Best Practices

1. ✅ Use strong, unique passwords
2. ✅ Keep `.env` file out of version control (add to `.gitignore`)
3. ✅ Use `.env.local` for sensitive local development
4. ✅ Implement JWT expiration for tokens
5. ✅ Consider rate limiting on login endpoint
6. ✅ Use HTTPS in production
7. ✅ Rotate passwords regularly
8. ✅ For production, migrate to database-backed authentication with proper hashing

## Related Files

- [src/lib/adminAuth.js](./src/lib/adminAuth.js) - Token creation and management
- [src/app/api/admin/login/route.js](./src/app/api/admin/login/route.js) - Login API endpoint
- [src/app/admin/page.tsx](./src/app/admin/page.tsx) - Admin dashboard page
