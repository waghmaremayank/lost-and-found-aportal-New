import { cookies } from 'next/headers'
import { getUserFromSession } from '@/lib/server-store'

export async function GET() {
  const cookieStore = await cookies()
  const user = await getUserFromSession(cookieStore.get('lost98_session')?.value)
  return Response.json({ user })
}
