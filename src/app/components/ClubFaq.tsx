'use client'

import { CLUB } from '../klub/data'
import FaqSection from './FaqSection'

export default function ClubFaq() {
  return <FaqSection items={CLUB.faq} lead={CLUB.faqLead} />
}
