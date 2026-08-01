'use client'

import PillCta from './PillCta'
import { useLeadModal } from './LeadModalContext'

export default function BookCta({
  label = 'Забронювати місце',
}: {
  label?: string
}) {
  const { openModal } = useLeadModal()
  return <PillCta label={label} onClick={openModal} />
}
