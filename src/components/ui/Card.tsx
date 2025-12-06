import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
}

export function Card({ className, gradient = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-barber-charcoal/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl',
        gradient && 'bg-gradient-to-br from-barber-cream/50 to-white',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}