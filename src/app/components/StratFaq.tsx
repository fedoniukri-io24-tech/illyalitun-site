'use client'

import { STRAT } from '../strat-sesiya/data'
import FaqSection from './FaqSection'

export default function StratFaq() {
  return <FaqSection items={STRAT.faq} lead={STRAT.faqLead} />
}
