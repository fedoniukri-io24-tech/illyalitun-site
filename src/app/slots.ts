/** Ukrainian month names for «на вересень / на жовтень». */
const MONTHS_UA = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
] as const

/** `offset: 0` — поточний місяць, `1` — наступний. Сам перемикається щомісяця. */
export function monthUa(offset = 0, now = new Date()): string {
  return MONTHS_UA[(now.getMonth() + offset + 12) % 12]
}

export function slotsLine(left: number, total: number, period: string): string {
  return `Залишилося ${left} з ${total} місць на ${period}`
}
