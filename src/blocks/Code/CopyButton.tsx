'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { CheckIcon } from '@payloadcms/ui/icons/Check'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [icon, setIcon] = useState('copy')

  function updateCopyStatus() {
    if (icon === 'copy') {
      setIcon(() => 'copying')
      setTimeout(() => {
        setIcon(() => 'copy')
      }, 1000)
    }
  }

  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1"
        variant={'secondary'}
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          updateCopyStatus()
        }}
      >
        {icon === 'copy' ? <CopyIcon /> : <CheckIcon />}
      </Button>
    </div>
  )
}
