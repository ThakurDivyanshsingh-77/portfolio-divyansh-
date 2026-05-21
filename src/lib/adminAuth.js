import crypto from 'node:crypto';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_PASSWORD || '';
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createAdminToken(username) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      issuedAt: Date.now(),
    })
  ).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token) {
  if (!token || !getSecret() || !token.includes('.')) {
    return false;
  }

  const [payload, signature] = token.split('.');
  const expectedSignature = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof decoded.issuedAt === 'number' && Date.now() - decoded.issuedAt < TOKEN_TTL_MS;
  } catch {
    return false;
  }
}
