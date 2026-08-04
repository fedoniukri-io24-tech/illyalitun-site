'use client'

import PillCta from './PillCta'
import { useLeadModal, type LeadIntent } from './LeadModalContext'

export default function BookCta({
  label = 'Забронювати місце',
  tariff,
}: {
  label?: string
  /** e.g. "Індивідуальний · $3000" */
  tariff?: string
}) {
  const { openModal } = useLeadModal()
  const intent: LeadIntent | undefined = tariff ? { tariff } : undefined
  return <PillCta label={label} onClick={() => openModal(intent)} />
}
