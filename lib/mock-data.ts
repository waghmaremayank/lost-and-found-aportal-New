export type ReportType = 'LOST' | 'FOUND'
export type ReportStatus = 'ACTIVE' | 'MATCHED' | 'CLAIMED' | 'RESOLVED' | 'CLOSED'

export type Item = {
  id: string
  type: ReportType
  title: string
  category: string
  brand?: string
  color: string
  description: string
  generalLocation: string
  dateOccurred: string
  status: ReportStatus
  matchConfidence?: number
  possibleMatches: number
  reporter: string
}

export const CATEGORIES = [
  'Bags',
  'Electronics',
  'Wallets & Cards',
  'Keys',
  'Jewelry',
  'Clothing',
  'Documents',
  'Eyewear',
  'Water Bottles',
  'Other',
] as const

export const LOCATIONS = [
  'North Campus',
  'South Campus',
  'Central Library',
  'Student Union',
  'Metro Station',
  'City Park',
  'Downtown Transit',
  'Sports Complex',
] as const

export const STATS = {
  reports: 2481,
  returned: 1204,
  active: 327,
}

export const ITEMS: Item[] = [
  {
    id: 'L98-2048',
    type: 'FOUND',
    title: 'Black Backpack',
    category: 'Bags',
    brand: 'Herschel',
    color: 'Black',
    description: 'Medium black backpack found near the main lecture hall. Contains notebooks.',
    generalLocation: 'North Campus',
    dateOccurred: '2026-09-22',
    status: 'MATCHED',
    matchConfidence: 87,
    possibleMatches: 3,
    reporter: 'U-1180',
  },
  {
    id: 'L98-2049',
    type: 'LOST',
    title: 'Black Leather Wallet',
    category: 'Wallets & Cards',
    brand: 'Fossil',
    color: 'Black',
    description: 'Bifold wallet lost somewhere between the library and the bus stop.',
    generalLocation: 'Central Library',
    dateOccurred: '2026-09-21',
    status: 'ACTIVE',
    possibleMatches: 1,
    reporter: 'U-2048',
  },
  {
    id: 'L98-2050',
    type: 'FOUND',
    title: 'Silver iPhone',
    category: 'Electronics',
    brand: 'Apple',
    color: 'Silver',
    description: 'Locked phone found on a bench. Cracked screen protector.',
    generalLocation: 'City Park',
    dateOccurred: '2026-09-23',
    status: 'ACTIVE',
    possibleMatches: 2,
    reporter: 'U-0771',
  },
  {
    id: 'L98-2051',
    type: 'LOST',
    title: 'House Keys with Blue Tag',
    category: 'Keys',
    color: 'Silver',
    description: 'Set of three keys on a ring with a bright blue rubber tag.',
    generalLocation: 'Metro Station',
    dateOccurred: '2026-09-20',
    status: 'ACTIVE',
    possibleMatches: 0,
    reporter: 'U-2048',
  },
  {
    id: 'L98-2052',
    type: 'FOUND',
    title: 'Prescription Glasses',
    category: 'Eyewear',
    brand: 'Ray-Ban',
    color: 'Tortoise',
    description: 'Glasses in a brown hard case, left at the front desk.',
    generalLocation: 'Student Union',
    dateOccurred: '2026-09-19',
    status: 'RESOLVED',
    possibleMatches: 0,
    reporter: 'U-3310',
  },
  {
    id: 'L98-2053',
    type: 'LOST',
    title: 'Blue Water Bottle',
    category: 'Water Bottles',
    brand: 'Hydro Flask',
    color: 'Navy',
    description: 'Dented navy insulated bottle covered in stickers.',
    generalLocation: 'Sports Complex',
    dateOccurred: '2026-09-18',
    status: 'ACTIVE',
    possibleMatches: 1,
    reporter: 'U-2048',
  },
  {
    id: 'L98-2054',
    type: 'FOUND',
    title: 'Gold Ring',
    category: 'Jewelry',
    color: 'Gold',
    description: 'Plain gold band found in a locker room. Held at security desk.',
    generalLocation: 'Sports Complex',
    dateOccurred: '2026-09-24',
    status: 'ACTIVE',
    possibleMatches: 4,
    reporter: 'U-9021',
  },
  {
    id: 'L98-2055',
    type: 'LOST',
    title: 'Grey Laptop Sleeve',
    category: 'Bags',
    color: 'Grey',
    description: '13-inch felt laptop sleeve with a small ink stain on the corner.',
    generalLocation: 'Downtown Transit',
    dateOccurred: '2026-09-17',
    status: 'CLOSED',
    possibleMatches: 0,
    reporter: 'U-4412',
  },
]

export type UserReport = Item & { unread: number; claims: number }

export const MY_REPORTS: UserReport[] = ITEMS.filter((i) => i.reporter === 'U-2048').map((i) => ({
  ...i,
  unread: i.id === 'L98-2049' ? 2 : 0,
  claims: i.id === 'L98-2049' ? 1 : 0,
}))

export type Conversation = {
  id: string
  reportId: string
  reportTitle: string
  withUser: string
  lastMessage: string
  lastAt: string
  unread: number
  messages: { id: string; from: 'me' | 'them'; body: string; at: string }[]
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'C-501',
    reportId: 'L98-2048',
    reportTitle: 'Black Backpack',
    withUser: 'U-1180',
    lastMessage: 'I can meet at the campus security desk tomorrow at noon.',
    lastAt: '10:42',
    unread: 2,
    messages: [
      { id: 'm1', from: 'them', body: 'Hi — I think I found your backpack near the lecture hall.', at: '10:31' },
      { id: 'm2', from: 'me', body: 'That could be mine! It has a small keychain on the zipper.', at: '10:36' },
      { id: 'm3', from: 'them', body: 'To confirm, can you verify what is inside? (verification pending)', at: '10:40' },
      { id: 'm4', from: 'them', body: 'I can meet at the campus security desk tomorrow at noon.', at: '10:42' },
    ],
  },
  {
    id: 'C-502',
    reportId: 'L98-2053',
    reportTitle: 'Blue Water Bottle',
    withUser: 'U-6650',
    lastMessage: 'No worries, let me know if it turns up.',
    lastAt: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', from: 'me', body: 'Did the bottle you found have stickers on it?', at: '09:12' },
      { id: 'm2', from: 'them', body: 'It was plain, sorry. Probably not yours.', at: '09:20' },
      { id: 'm3', from: 'me', body: 'No worries, let me know if it turns up.', at: '09:22' },
    ],
  },
]

export type Notification = {
  id: string
  type: 'MATCH' | 'CLAIM' | 'MESSAGE' | 'SECURITY' | 'SYSTEM'
  title: string
  message: string
  read: boolean
  at: string
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'N-1',
    type: 'MATCH',
    title: 'POSSIBLE MATCH FOUND',
    message: 'A found item may match your lost report #L98-2049.',
    read: false,
    at: '2 min ago',
  },
  {
    id: 'N-2',
    type: 'MESSAGE',
    title: 'NEW SECURE MESSAGE',
    message: 'U-1180 sent you a message about report #L98-2048.',
    read: false,
    at: '18 min ago',
  },
  {
    id: 'N-3',
    type: 'SECURITY',
    title: 'SECURITY CHECK PASSED',
    message: 'New sign-in from a recognized device was verified.',
    read: true,
    at: '3 hours ago',
  },
]

export type VerificationQuestion = { id: string; question: string }

export const VERIFICATION_QUESTIONS: VerificationQuestion[] = [
  { id: 'q1', question: 'What items were inside the bag?' },
  { id: 'q2', question: 'What unique mark or wear does it have?' },
  { id: 'q3', question: 'What accessory or keychain is attached?' },
]

export type SecuritySession = {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

export const SESSIONS: SecuritySession[] = [
  { id: 's1', device: 'Chrome on Windows', location: 'North Campus', lastActive: 'Active now', current: true },
  { id: 's2', device: 'Safari on iPhone', location: 'Downtown', lastActive: '2 hours ago', current: false },
  { id: 's3', device: 'Firefox on Linux', location: 'City Park', lastActive: 'Yesterday', current: false },
]

export type SecurityLogEntry = {
  at: string
  type: string
  status: 'SUCCESS' | 'BLOCKED' | 'INFO'
  detail: string
}

export const SECURITY_LOG: SecurityLogEntry[] = [
  { at: '2026-09-24 22:41', type: 'USER LOGIN', status: 'SUCCESS', detail: 'User: U-2048' },
  { at: '2026-09-24 22:43', type: 'CLAIM CREATED', status: 'INFO', detail: 'Report: L98-2049' },
  { at: '2026-09-24 22:45', type: 'RATE LIMIT', status: 'BLOCKED', detail: 'Too many claim attempts' },
  { at: '2026-09-24 21:02', type: 'PASSWORD CHANGED', status: 'SUCCESS', detail: 'User: U-2048' },
  { at: '2026-09-23 08:15', type: 'NEW DEVICE', status: 'INFO', detail: 'Safari on iPhone' },
]

/* ------------------------------- Admin data ------------------------------ */

export const ADMIN_METRICS = {
  activeReports: 327,
  lostReports: 189,
  foundReports: 138,
  resolvedCases: 1204,
  pendingClaims: 42,
  flaggedUsers: 6,
  securityEvents: 18,
}

export type AdminUser = {
  id: string
  displayName: string
  email: string
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  status: 'ACTIVE' | 'FLAGGED' | 'SUSPENDED'
  reports: number
  joined: string
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 'U-2048', displayName: 'alex.m', email: 'a***@mail.com', role: 'USER', status: 'ACTIVE', reports: 4, joined: '2026-06-01' },
  { id: 'U-1180', displayName: 'jordan.k', email: 'j***@mail.com', role: 'USER', status: 'ACTIVE', reports: 12, joined: '2026-03-14' },
  { id: 'U-9021', displayName: 'sam.r', email: 's***@mail.com', role: 'MODERATOR', status: 'ACTIVE', reports: 2, joined: '2026-01-09' },
  { id: 'U-7788', displayName: 'chris.p', email: 'c***@mail.com', role: 'USER', status: 'FLAGGED', reports: 31, joined: '2026-09-10' },
  { id: 'U-4412', displayName: 'taylor.w', email: 't***@mail.com', role: 'USER', status: 'SUSPENDED', reports: 0, joined: '2026-08-22' },
]

export type SecurityEvent = {
  id: string
  event: string
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  user: string
  action: string
  at: string
}

export const SECURITY_EVENTS: SecurityEvent[] = [
  { id: 'SE-1', event: 'Multiple failed ownership claims', risk: 'MEDIUM', user: 'U-7788', action: 'Additional verification required', at: '2026-09-24 22:45' },
  { id: 'SE-2', event: 'Many reports submitted rapidly', risk: 'MEDIUM', user: 'U-7788', action: 'Rate limited', at: '2026-09-24 20:11' },
  { id: 'SE-3', event: 'Multiple account creation attempts', risk: 'HIGH', user: 'IP-hash 4f2a', action: 'Signups blocked', at: '2026-09-24 18:30' },
  { id: 'SE-4', event: 'Suspicious upload rejected', risk: 'LOW', user: 'U-4412', action: 'File blocked', at: '2026-09-23 14:02' },
]

export type AbuseReport = {
  id: string
  target: string
  reason: string
  reportedBy: string
  status: 'OPEN' | 'REVIEWING' | 'RESOLVED'
  at: string
}

export const ABUSE_REPORTS: AbuseReport[] = [
  { id: 'AB-1', target: 'Listing L98-2054', reason: 'Possible fraudulent claim', reportedBy: 'U-9021', status: 'OPEN', at: '2026-09-24' },
  { id: 'AB-2', target: 'User U-7788', reason: 'Spam messages', reportedBy: 'U-2048', status: 'REVIEWING', at: '2026-09-23' },
  { id: 'AB-3', target: 'Listing L98-2050', reason: 'Wrong category', reportedBy: 'U-1180', status: 'RESOLVED', at: '2026-09-22' },
]

export function statusTone(status: ReportStatus): 'green' | 'blue' | 'yellow' | 'neutral' | 'red' {
  switch (status) {
    case 'RESOLVED':
      return 'green'
    case 'MATCHED':
      return 'blue'
    case 'CLAIMED':
      return 'yellow'
    case 'CLOSED':
      return 'neutral'
    default:
      return 'neutral'
  }
}
