import type { Block } from 'payload'

export const SharedCode: Block = {
  slug: 'sharedcode',
  interfaceName: 'SharedCodeBlock',
  fields: [
    {
      name: 'sharedcodeblocks',
      type: 'relationship',
      label: false,
      relationTo: 'sharedcode',
    },
  ],
}
