import { verifyAdminToken } from '../../../../lib/adminAuth';
import dbConnect from '../../../../lib/mongodb';
import Contact from '../../../../models/Contact';

export const runtime = 'nodejs';

const json = (data, status = 200) =>
  Response.json(data, {
    status,
  });
const err = (message, status = 400) => json({ message }, status);

export async function GET(request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!verifyAdminToken(token)) {
    return err('Unauthorized', 401);
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
  const offset = Math.max(parseInt(url.searchParams.get('offset') || '0', 10), 0);

  try {
    await dbConnect();

    const [messages, count] = await Promise.all([
      Contact.find({})
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Contact.countDocuments({}),
    ]);

    const data = messages.map((message) => {
      const createdAt =
        message.createdAt instanceof Date
          ? message.createdAt.toISOString()
          : new Date(message.createdAt).toISOString();

      return {
        id: message._id.toString(),
        name: message.name,
        email: message.email,
        message: message.message,
        createdAt,
        created_at: createdAt,
      };
    });

    return json({ data, count, limit, offset });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Unknown error';

    if (messageText.includes('MONGODB_URI')) {
      return err('Database not configured', 503);
    }

    console.error('[admin/messages] mongodb error', messageText);
    return err('Failed to fetch messages', 502);
  }
}
