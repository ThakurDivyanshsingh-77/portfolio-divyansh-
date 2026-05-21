import mongoose from 'mongoose';
import crypto from 'crypto';

/**
 * Admin User Model (Optional - For future database-backed authentication)
 * 
 * Currently, the app uses environment variables for admin credentials.
 * This model is provided as a template if you want to migrate to
 * database-backed authentication in the future.
 * 
 * To use this model:
 * 1. Create a new file: src/models/Admin.js
 * 2. Update src/app/api/admin/login/route.js to query this model
 * 3. Create a seed script to initialize the admin user
 */

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'super_admin'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// Hash password before saving (if you implement this model)
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  // Implement password hashing here (use bcrypt in production)
  next();
});

// Method to verify password (if you implement this model)
AdminSchema.methods.verifyPassword = function (password) {
  // Implement password verification using bcrypt
  return password === this.passwordHash; // ⚠️ DO NOT use plain comparison in production
};

// Method to record login attempt
AdminSchema.methods.recordLoginAttempt = async function (success = true) {
  if (success) {
    this.loginAttempts = 0;
    this.lastLogin = new Date();
    this.lockedUntil = null;
  } else {
    this.loginAttempts += 1;
    if (this.loginAttempts >= 5) {
      // Lock account for 30 minutes after 5 failed attempts
      this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
    }
  }
  return this.save();
};

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
