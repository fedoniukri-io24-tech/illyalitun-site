'use client'

import PillCta from './PillCta'
import { useLeadModal, type LeadIntent } from './LeadModalContext'

export default function BookCta({
  label = 'Забронювати місце',
  tariff,
  href,
}: {
  label?: string
  /** e.g. "Індивідуальний · $3000" */
  tariff?: string
  /** If set — відкриває зовнішню анкету замість модалки */
  href?: string
}) {
  const { openModal } = useLeadModal()

  if (href) {
    return <PillCta label={label} href={href} external />
  }

  const intent: LeadIntent | undefined = tariff ? { tariff } : undefined
  return <PillCta label={label} onClick={() => openModal(intent)} />
}
