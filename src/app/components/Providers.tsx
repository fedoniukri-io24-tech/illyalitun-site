'use client'

import { LeadModalProvider } from './LeadModalContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LeadModalProvider>{children}</LeadModalProvider>
}
