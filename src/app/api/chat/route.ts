import Groq from 'groq-sdk';

export const runtime = 'nodejs';

type ErrorCode =
  | 'CONFIG_ERROR'
  | 'INVALID_JSON'
  | 'INVALID_MESSAGES'
  | 'INVALID_RESPONSE'
  | 'AI_SERVICE_ERROR'
  | 'TIMEOUT'
  | 'INTERNAL_ERROR';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const ts = () => new Date().toISOString();
const json = (data: unknown, status = 200) => Response.json(data, { status });
const err = (code: ErrorCode, message: string, status: number) =>
  json({ code, message, timestamp: ts() }, status);

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('[Chat API] Missing GROQ_API_KEY');
    return err(
      'CONFIG_ERROR',
      'Chat service is not configured. Please contact the site administrator.',
      503
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return err('INVALID_JSON', 'Invalid request format', 400);
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return err('INVALID_MESSAGES', 'Messages array is required and must not be empty', 400);
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      console.error('[Chat API] Invalid response from Groq API');
      return err('INVALID_RESPONSE', 'Received invalid response from AI service', 500);
    }

    return json({ message: content }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (error instanceof Groq.APIError) {
      return err(
        'AI_SERVICE_ERROR',
        process.env.NODE_ENV === 'development'
          ? `AI service error: ${message}`
          : 'The AI service is temporarily unavailable',
        (error as { status?: number }).status || 500
      );
    }

    if (message.includes('timeout')) {
      return err('TIMEOUT', 'Request timed out. Please try again.', 504);
    }

    console.error('[Chat API] Error:', message);
    return err(
      'INTERNAL_ERROR',
      process.env.NODE_ENV === 'development'
        ? message
        : 'An unexpected error occurred. Please try again later.',
      500
    );
  }
}
