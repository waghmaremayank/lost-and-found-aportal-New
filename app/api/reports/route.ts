import { cookies } from 'next/headers'
import { createReport, getUserFromSession, listReports } from '@/lib/server-store'
import type { ReportType } from '@/lib/mock-data'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const type = url.searchParams.get('type')
  const reports = await listReports({
    query: url.searchParams.get('q') ?? undefined,
    type: type === 'LOST' || type === 'FOUND' ? (type as ReportType) : undefined,
    category: url.searchParams.get('category') ?? undefined,
    location: url.searchParams.get('location') ?? undefined,
  })
  return Response.json({ reports })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const user = await getUserFromSession(cookieStore.get('lost98_session')?.value)
  if (!user) return Response.json({ error: 'You must be logged in to create a report.' }, { status: 401 })
  const body = (await request.json()) as Record<string, unknown>
  const required = ['type', 'title', 'category', 'color', 'description', 'generalLocation', 'dateOccurred']
  if (required.some((field) => typeof body[field] !== 'string' || !(body[field] as string).trim())) {
    return Response.json({ error: 'Missing required report fields.' }, { status: 400 })
  }
  if (body.type !== 'LOST' && body.type !== 'FOUND') {
    return Response.json({ error: 'Report type must be LOST or FOUND.' }, { status: 400 })
  }
  const report = await createReport({
    type: body.type,
    title: body.title,
    category: body.category,
    brand: typeof body.brand === 'string' ? body.brand : undefined,
    color: body.color,
    description: body.description,
    generalLocation: body.generalLocation,
    dateOccurred: body.dateOccurred,
  }, user.id)
  return Response.json({ report }, { status: 201 })
}
