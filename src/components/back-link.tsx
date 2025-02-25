import Link from 'next/link'
import type { JSX } from 'react'

export interface BacklinkProps {
  home: string
  path: string
}

export function BackLink({ home, path }: BacklinkProps): JSX.Element {
  return (
    <div className="h-[48px]">
      <Link href={path} type="secondary" className="no-underline hover:underline text-gray-400">
        <small>← Back to {home}</small>
      </Link>
    </div>
  )
}
