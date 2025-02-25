import { CodeFields } from '@/fields/code'
import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: CodeFields,
}
