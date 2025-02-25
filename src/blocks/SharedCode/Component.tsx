import type React from 'react'
import { Code } from '@/blocks/Code/Component.client'
import type { Sharedcode as SharedCodeBlockType } from '@/payload-types'

export type SharedCodeBlockProps = {
  sharedcodeblocks: SharedCodeBlockType
  blockType: 'sharedcode'
}

type Props = SharedCodeBlockProps & {
  className?: string
}

export const SharedCodeBlock: React.FC<Props> = ({ className, sharedcodeblocks }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code
        code={sharedcodeblocks.code}
        language={sharedcodeblocks.language}
        pagePath={sharedcodeblocks.pagePath as string}
      />
    </div>
  )
}
