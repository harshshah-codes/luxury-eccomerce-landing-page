import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'maison2024';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { username, role: 'admin', iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return NextResponse.json({ token });
}
