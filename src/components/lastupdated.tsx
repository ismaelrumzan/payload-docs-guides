'use client'
import { formatDate } from 'date-fns'
import type { JSX } from 'react'

export function LastUpdated({ updatedAt }: { updatedAt: string }): JSX.Element {
  return (
    <div className="text-gray-500 text-sm  w-full ">
      <div>Last updated on {formatDate(new Date(updatedAt), 'MMMM d, yyyy')}</div>
    </div>
  )
}
