import { NextResponse } from 'next/server'
import { createSession, registerUser } from '@/lib/server-store'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const handle = typeof body.handle === 'string' ? body.handle : ''
    const email = typeof body.email === 'string' ? body.email : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!/^[a-zA-Z0-9._-]{3,30}$/.test(handle) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return Response.json({ error: 'Use a valid handle, email, and a password of at least 8 characters.' }, { status: 400 })
    }
    const user = await registerUser(handle, email, password)
    const token = await createSession(user.id)
    const response = NextResponse.json({ user }, { status: 201 })
    response.cookies.set('lost98_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' })
    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create account.'
    return Response.json({ error: message }, { status: 409 })
  }
}
