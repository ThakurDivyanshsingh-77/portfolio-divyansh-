#!/usr/bin/env node

/**
 * Initialize Admin Seed
 * 
 * Usage: node util/init-admin-seed.js
 * 
 * This script initializes the admin credentials from environment variables.
 * It validates that the credentials are properly configured.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.error(`   Expected path: ${envPath}`);
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf-8');
const adminUsernameMatch = envContent.match(/ADMIN_USERNAME=(.+)/);
const adminPasswordMatch = envContent.match(/ADMIN_PASSWORD=(.+)/);

const adminUsername = adminUsernameMatch ? adminUsernameMatch[1].trim() : null;
const adminPassword = adminPasswordMatch ? adminPasswordMatch[1].trim() : null;

console.log('\n' + '='.repeat(60));
console.log('🔐 ADMIN SEED INITIALIZATION');
console.log('='.repeat(60));

// Validation
let hasErrors = false;

if (!adminUsername) {
  console.error('❌ ADMIN_USERNAME not found in .env');
  hasErrors = true;
} else {
  console.log(`✅ Username: ${adminUsername}`);
}

if (!adminPassword) {
  console.error('❌ ADMIN_PASSWORD not found in .env');
  hasErrors = true;
} else {
  console.log(`✅ Password: ${'•'.repeat(adminPassword.length)} (${adminPassword.length} characters)`);
}

if (adminPassword && adminPassword.length < 6) {
  console.warn('⚠️  Warning: Password is too short. Use at least 6 characters.');
}

if (hasErrors) {
  console.error('\n❌ Admin seed initialization failed!');
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('✅ Admin seed successfully initialized!');
console.log('='.repeat(60));
console.log('\nAdmin Login Endpoint:');
console.log('  POST /api/admin/login');
console.log('\nExample request:');
console.log('  {"username": "admin", "password": "admin123"}');
console.log('\n' + '='.repeat(60) + '\n');

process.exit(0);
