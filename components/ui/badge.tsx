import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant: 'success' | 'warning' | 'danger' | 'info' | 'default'
}

export function Badge({ children, variant }: BadgeProps) {
  return <span className={`status-badge ${variant}`}>{children}</span>
}
