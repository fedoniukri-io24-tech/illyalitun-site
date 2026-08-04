'use client'

import { CONSULTATION } from '../konsultatsiya/data'
import FaqSection from './FaqSection'

export default function ConsultationFaq() {
  return <FaqSection items={CONSULTATION.faq} lead={CONSULTATION.faqLead} />
}
