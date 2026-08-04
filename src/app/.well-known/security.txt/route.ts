import { buildSecurityTxt, textResponse } from '../../site-docs'

export const dynamic = 'force-static'

export function GET() {
  return textResponse(buildSecurityTxt())
}
