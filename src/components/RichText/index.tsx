import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, type CodeBlockProps } from '@/blocks/Code/Component'
import { SharedCodeBlock, type SharedCodeBlockProps } from '@/blocks/SharedCode/Component'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CodeBlockProps | SharedCodeBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    sharedcode: ({ node }) => <SharedCodeBlock className="col-start-2" {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { ...rest } = props
  return <RichTextWithoutBlocks converters={jsxConverters} {...rest} />
}
