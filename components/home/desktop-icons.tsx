import {
  Monitor,
  Search,
  FilePlus2,
  MapPin,
  PackageSearch,
  MessageSquare,
  ShieldCheck,
  Trash2,
  Users,
  CheckSquare,
  ShieldAlert,
} from 'lucide-react'
import { RetroDesktopIcon } from '@/components/retro'

const ICONS = [
  { label: 'My Computer', href: '/dashboard', icon: Monitor },
  { label: 'Search DB', href: '/search', icon: Search },
  { label: 'Report Lost', href: '/lost', icon: FilePlus2 },
  { label: 'Report Found', href: '/found', icon: MapPin },
  { label: 'My Reports', href: '/reports', icon: PackageSearch },
  { label: 'Claims Center', href: '/claims', icon: CheckSquare },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Security Center', href: '/security', icon: ShieldCheck },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Admin Station', href: '/admin', icon: ShieldAlert },
  { label: 'Recycle Bin', href: '/recycle', icon: Trash2 },
]

export function DesktopIcons() {
  return (
    <div className="flex flex-col flex-wrap gap-1 sm:h-[540px]">
      {ICONS.map((item) => {
        const Icon = item.icon
        return (
          <RetroDesktopIcon
            key={item.label}
            label={item.label}
            href={item.href}
            icon={
              <span className="bevel-out grid h-9 w-9 place-items-center bg-win-face text-win-title">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            }
          />
        )
      })}
    </div>
  )
}
