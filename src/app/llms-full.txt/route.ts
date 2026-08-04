import { buildLlmsFullTxt, textResponse } from '../site-docs'

export const dynamic = 'force-static'

export function GET() {
  return textResponse(buildLlmsFullTxt())
}
