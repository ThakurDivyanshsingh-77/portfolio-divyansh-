import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export const runtime = 'nodejs';

const json = (data, status = 200) =>
  Response.json(data, {
    status,
  });
const bad = (message, status = 400) => json({ message }, status);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid JSON', 400);
  }

  const { name, email, message, company, t } = body || {};

  if (!name || !email || !message) return bad('Missing required fields', 400);
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return bad('Invalid field types', 400);
  }
  if (!/.+@.+\..+/.test(email)) return bad('Invalid email', 400);
  if (company && String(company).trim() !== '') return bad('Spam detected', 400);
  if (typeof t === 'number' && t < 5) {
    return bad('Too fast. Please take a moment before sending.', 429);
  }

  try {
    await dbConnect();
    await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return json({ ok: true });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Unknown error';

    if (messageText.includes('MONGODB_URI')) {
      return json(
        {
          code: 'UNCONFIGURED',
          message: 'Contact database is not configured. Use the email link instead.',
        },
        503
      );
    }

    console.error('[contact] Error', messageText);
    return bad('Unexpected error. Please try again later.', 500);
  }
}

export async function GET() {
  return json({ ok: true });
}
