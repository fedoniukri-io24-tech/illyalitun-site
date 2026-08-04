'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import LeadModal from './LeadModal'

export type LeadIntent = {
  /** Selected tariff name + price, e.g. "Індивідуальний · $3000" */
  tariff?: string
}

type LeadModalContextValue = {
  openModal: (intent?: LeadIntent) => void
  intent: LeadIntent | null
  clearIntent: () => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [intent, setIntent] = useState<LeadIntent | null>(null)

  const openModal = useCallback((next?: LeadIntent) => {
    setIntent(next?.tariff ? next : null)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const clearIntent = useCallback(() => setIntent(null), [])

  const value = useMemo(
    () => ({ openModal, intent, clearIntent }),
    [openModal, intent, clearIntent],
  )

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal
        open={open}
        onClose={closeModal}
        intent={intent}
      />
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
