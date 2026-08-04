import { buildHumansTxt, textResponse } from '../site-docs'

export const dynamic = 'force-static'

export function GET() {
  return textResponse(buildHumansTxt())
}
