import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import path from 'node:path'
import { ITEMS, type Item, type ReportType } from '@/lib/mock-data'

const scrypt = promisify(scryptCallback)
const dataDirectory = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDirectory, 'store.json')

type User = {
  id: string
  handle: string
  email: string
  passwordHash: string
  createdAt: string
}

type Session = {
  userId: string
  expiresAt: string
}

type Store = {
  users: User[]
  sessions: Record<string, Session>
  reports: Item[]
}

const initialStore = (): Store => ({
  users: [
    {
      id: 'U-2048',
      handle: 'alex.m',
      email: 'alex@example.com',
      passwordHash: hashPasswordSync('demo1234'),
      createdAt: new Date().toISOString(),
    },
  ],
  sessions: {},
  reports: ITEMS,
})

function hashPasswordSync(password: string) {
  return createHash('sha256').update(password).digest('hex')
}

async function loadStore(): Promise<Store> {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8')) as Store
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    const store = initialStore()
    await saveStore(store)
    return store
  }
}

async function saveStore(store: Store) {
  await mkdir(dataDirectory, { recursive: true })
  const temporaryFile = `${dataFile}.${process.pid}.tmp`
  await writeFile(temporaryFile, JSON.stringify(store, null, 2), 'utf8')
  await rename(temporaryFile, dataFile)
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

async function verifyPassword(password: string, stored: string) {
  const [salt, expectedHex] = stored.split(':')
  if (!salt || !expectedHex) return false
  const actual = (await scrypt(password, salt, 64)) as Buffer
  const expected = Buffer.from(expectedHex, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export async function registerUser(handle: string, email: string, password: string) {
  const store = await loadStore()
  const normalizedHandle = handle.trim().toLowerCase()
  const normalizedEmail = email.trim().toLowerCase()
  if (store.users.some((user) => user.handle === normalizedHandle || user.email === normalizedEmail)) {
    throw new Error('An account with that handle or email already exists.')
  }
  const user: User = {
    id: `U-${Math.floor(1000 + Math.random() * 9000)}`,
    handle: normalizedHandle,
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  }
  store.users.push(user)
  await saveStore(store)
  return publicUser(user)
}

export async function authenticateUser(identifier: string, password: string) {
  const store = await loadStore()
  const normalizedIdentifier = identifier.trim().toLowerCase()
  const user = store.users.find(
    (candidate) => candidate.handle === normalizedIdentifier || candidate.email === normalizedIdentifier,
  )
  if (!user || !(await verifyPassword(password, user.passwordHash))) return null
  return publicUser(user)
}

function publicUser(user: User) {
  return { id: user.id, handle: user.handle, email: user.email }
}

export async function createSession(userId: string) {
  const store = await loadStore()
  const token = randomBytes(32).toString('hex')
  store.sessions[token] = {
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  }
  await saveStore(store)
  return token
}

export async function getUserFromSession(token: string | undefined) {
  if (!token) return null
  const store = await loadStore()
  const session = store.sessions[token]
  if (!session || new Date(session.expiresAt) <= new Date()) return null
  const user = store.users.find((candidate) => candidate.id === session.userId)
  return user ? publicUser(user) : null
}

export async function deleteSession(token: string | undefined) {
  if (!token) return
  const store = await loadStore()
  delete store.sessions[token]
  await saveStore(store)
}

export async function listReports(filters: {
  query?: string
  type?: ReportType
  category?: string
  location?: string
}) {
  const store = await loadStore()
  const query = filters.query?.trim().toLowerCase()
  return store.reports.filter((report) => {
    if (filters.type && report.type !== filters.type) return false
    if (filters.category && report.category !== filters.category) return false
    if (filters.location && report.generalLocation !== filters.location) return false
    if (query) {
      const haystack = `${report.id} ${report.title} ${report.description} ${report.brand ?? ''} ${report.color}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

export async function createReport(input: Omit<Item, 'id' | 'status' | 'possibleMatches' | 'reporter' | 'imageUrl'>, reporter: string) {
  const store = await loadStore()
  const report: Item = {
    ...input,
    id: `L98-${Math.floor(2056 + Math.random() * 800)}`,
    status: 'ACTIVE',
    possibleMatches: 0,
    reporter,
    imageUrl: '',
  }
  store.reports.unshift(report)
  await saveStore(store)
  return report
}
