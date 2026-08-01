'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import LeadModal from './LeadModal'

type LeadModalContextValue = {
  openModal: () => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const value = useMemo(() => ({ openModal }), [openModal])

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal open={open} onClose={() => setOpen(false)} />
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext)
  if (!ctx) {
    throw new Error('useLeadModal must be used within LeadModalProvider')
  }
  return ctx
}
