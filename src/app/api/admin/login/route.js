import { createAdminToken } from '../../../../lib/adminAuth';

export const runtime = 'nodejs';

const json = (data, status = 200) =>
  Response.json(data, {
    status,
  });

export async function POST(request) {
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return json({ error: 'Admin credentials not configured' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { username, password } = body || {};

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return json({ success: true, token: createAdminToken(username) });
  }

  return json({ error: 'Invalid credentials' }, 401);
}
