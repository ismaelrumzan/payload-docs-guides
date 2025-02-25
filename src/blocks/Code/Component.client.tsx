'use client'
import { Highlight, themes } from 'prism-react-renderer'
import type React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
  pagePath?: string
}

export const Code: React.FC<Props> = ({ code, language = '', pagePath = '' }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsLight}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="border text-xs border-border rounded overflow-x-auto">
          <div className="flex bg-gray-100 w-full items-center pl-4">
            <span className="text-gray-500 grow">{pagePath}</span>
            <CopyButton code={code} />
          </div>
          <div className="p-4">
            {tokens.map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={i} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none text-right text-gray-300">{i + 1}</span>
                <span className="table-cell pl-4">
                  {line.map((token, key) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  )
}
