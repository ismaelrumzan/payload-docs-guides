import type { Field } from 'payload'

export const CodeFields: Field[] = [
  {
    name: 'language',
    type: 'select',
    defaultValue: 'typescript',
    required: true,
    options: [
      { label: 'TypeScript', value: 'typescript' },
      { label: 'TSX', value: 'tsx' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'JSX', value: 'jsx' },
      { label: 'pnpm', value: 'pnpm' },
      { label: 'npm', value: 'npm' },
      { label: 'Bun', value: 'bun' },
      { label: 'CSS', value: 'css' },
      { label: 'Bash', value: 'bash' },
    ],
  },
  {
    name: 'code',
    type: 'code',
    label: false,
    required: true,
  },
  {
    name: 'pagePath',
    type: 'text',
    admin: {
      description: 'An example path of the code block',
    },
  },
]
