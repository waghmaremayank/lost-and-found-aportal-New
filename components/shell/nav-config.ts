import type { LucideIcon } from 'lucide-react'
import {
  Search,
  PackageSearch,
  MapPin,
  FilePlus2,
  MessageSquare,
  Bell,
  UserRound,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Users,
  LayoutGrid,
  CheckSquare,
} from 'lucide-react'

export type NavItem = {
  key: string
  label: string
  href: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'My Computer', href: '/dashboard', icon: LayoutGrid },
  { key: 'search', label: 'Search DB', href: '/search', icon: Search },
  { key: 'lost', label: 'Report Lost', href: '/lost', icon: FilePlus2 },
  { key: 'found', label: 'Report Found', href: '/found', icon: MapPin },
  { key: 'reports', label: 'My Reports', href: '/reports', icon: PackageSearch },
  { key: 'claims', label: 'Claims & Verify', href: '/claims', icon: CheckSquare },
  { key: 'messages', label: 'Messages', href: '/messages', icon: MessageSquare },
  { key: 'notifications', label: 'Notifications', href: '/notifications', icon: Bell },
  { key: 'community', label: 'Community', href: '/community', icon: Users },
  { key: 'security', label: 'Security Center', href: '/security', icon: ShieldCheck },
  { key: 'admin', label: 'Admin Console', href: '/admin', icon: ShieldAlert },
  { key: 'recycle', label: 'Recycle Bin', href: '/recycle', icon: Trash2 },
  { key: 'profile', label: 'My Account', href: '/profile', icon: UserRound },
]
