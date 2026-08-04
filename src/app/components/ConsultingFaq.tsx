'use client'

import { CONSULTING } from '../konsaltyng/data'
import FaqSection from './FaqSection'

export default function ConsultingFaq() {
  return <FaqSection items={CONSULTING.faq} lead={CONSULTING.faqLead} />
}
