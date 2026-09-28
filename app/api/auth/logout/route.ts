import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/server-store'

export async function POST() {
  const cookieStore = await cookies()
  await deleteSession(cookieStore.get('lost98_session')?.value)
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('lost98_session')
  return response
}
