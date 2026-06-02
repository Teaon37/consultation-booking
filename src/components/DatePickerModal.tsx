import { useEffect, useMemo, useState } from 'react'

type DatePickerModalProps = {
  open: boolean
  value: Date | null
  onClose: () => void
  onConfirm: (date: Date) => void
}

const currentYear = new Date().getFullYear()

export function DatePickerModal({
  open,
  value,
  onClose,
  onConfirm,
}: DatePickerModalProps) {
  const initial = value ?? new Date()
  const [year, setYear] = useState(initial.getFullYear())
  const [month, setMonth] = useState(initial.getMonth() + 1)
  const [day, setDay] = useState(initial.getDate())

  useEffect(() => {
    if (!open) return
    const base = value ?? new Date()
    setYear(base.getFullYear())
    setMonth(base.getMonth() + 1)
    setDay(base.getDate())
  }, [open, value])

  const years = useMemo(
    () => Array.from({ length: 6 }, (_, i) => currentYear + i),
    [],
  )

  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [year, month],
  )

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth],
  )

  useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth)
  }, [day, daysInMonth])

  if (!open) return null

  const handleConfirm = () => {
    onConfirm(new Date(year, month - 1, day))
    onClose()
  }

  return (
    <div className="sheet-overlay" role="presentation" onClick={onClose}>
      <div
        className="sheet-panel date-picker-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="date-picker-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-header">
          <h2 id="date-picker-title">상담 희망 날짜</h2>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="date-wheels">
          <label className="wheel-group">
            <span className="wheel-label">년</span>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="년도 선택"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
          </label>

          <label className="wheel-group">
            <span className="wheel-label">월</span>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              aria-label="월 선택"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
          </label>

          <label className="wheel-group">
            <span className="wheel-label">일</span>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              aria-label="일 선택"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}일
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="button" className="sheet-confirm" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
