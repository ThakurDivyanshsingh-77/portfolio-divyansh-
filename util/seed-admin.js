/**
 * Admin Seed Script
 * 
 * This script is for reference and documentation purposes.
 * The admin credentials are configured via environment variables in .env
 * 
 * Default Admin Credentials:
 * - Username: admin
 * - Password: admin123
 * 
 * To use different credentials, update the .env file:
 * ADMIN_USERNAME=your_username
 * ADMIN_PASSWORD=your_password
 * 
 * For production, use strong passwords and keep .env secure!
 */

import 'dotenv/config';

const adminConfig = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

console.log('='.repeat(50));
console.log('ADMIN SEED CONFIGURATION');
console.log('='.repeat(50));
console.log(`Username: ${adminConfig.username}`);
console.log(`Password: ${'*'.repeat(adminConfig.password.length)}`);
console.log('='.repeat(50));
console.log('\nAdmin credentials are loaded from environment variables.');
console.log('Update your .env file to change credentials.');
console.log('\nExample .env configuration:');
console.log('ADMIN_USERNAME=admin');
console.log('ADMIN_PASSWORD=admin123');

export default adminConfig;
