'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface Props {
  content: string
}

export function CopyButton({ content }: Props) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.message('Copied to clipboard')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Button variant="ghost" aria-label="copy-button" onClick={onClick}>
      <Copy className="size-4" />
    </Button>
  )
}
