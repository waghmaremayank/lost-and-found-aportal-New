import { NextResponse } from 'next/server'
import { authenticateUser, createSession } from '@/lib/server-store'

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>
  const identifier = typeof body.identifier === 'string' ? body.identifier : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const user = await authenticateUser(identifier, password)
  if (!user) return Response.json({ error: 'Invalid username/email or password.' }, { status: 401 })
  const token = await createSession(user.id)
  const response = NextResponse.json({ user })
  response.cookies.set('lost98_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' })
  return response
}
