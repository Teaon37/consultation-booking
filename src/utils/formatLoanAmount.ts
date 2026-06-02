/**
 * @param amountInManwon 만원 단위 (1000 = 1천만원, 47000 = 4.7억원)
 */
export function formatLoanAmount(amountInManwon: number): string {
  if (amountInManwon >= 200000) {
    return '20억원+'
  }

  if (amountInManwon >= 10000) {
    const eok = amountInManwon / 10000
    const fixed = eok.toFixed(1)
    const display = fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed
    return `${display}억원`
  }

  const cheonMan = amountInManwon / 1000
  return `${cheonMan}천만원`
}
