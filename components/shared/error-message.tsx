import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ErrorMessage({ children }: Props) {
  return <p className="text-sm text-destructive mt-1">{children}</p>
}
