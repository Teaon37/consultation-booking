export type TimeSlot = {
  id: string
  label: string
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatKoreanTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const period = hours < 12 ? '오전' : '오후'
  return `${period} ${pad(hours)}:${pad(minutes)}`
}

function formatTimeWithoutPeriod(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${pad(hours)}:${pad(minutes)}`
}

/** 08:00~08:30 … 17:30~18:00 (30분 단위) */
export function buildConsultationTimeSlots(): TimeSlot[] {
  const startMinutes = 8 * 60
  const endMinutes = 18 * 60
  const slots: TimeSlot[] = []

  for (let start = startMinutes; start < endMinutes; start += 30) {
    const end = start + 30
    const label = `${formatKoreanTime(start)} ~ ${formatTimeWithoutPeriod(end)}시`
    slots.push({ id: String(start), label })
  }

  return slots
}
