import type React from 'react'
import { Code } from './Component.client'

export type CodeBlockProps = {
  code: string
  language?: string
  pagePath?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, pagePath }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language} pagePath={pagePath} />
    </div>
  )
}
