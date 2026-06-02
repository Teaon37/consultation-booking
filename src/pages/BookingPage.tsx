import { useState, type FormEvent } from 'react'
import { BottomSheet } from '../components/BottomSheet'
import { DatePickerModal } from '../components/DatePickerModal'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { buildConsultationTimeSlots } from '../utils/timeSlots'
import counselorImage from '../assets/counselor.png'
import '../App.css'

const TIME_SLOTS = buildConsultationTimeSlots()

const CONSULTATION_TYPES = [
  '사업자 대출',
  '전세 대출',
  '주택담보 대출',
] as const

function formatDisplayDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}년 ${m}월 ${d}일`
}

export function BookingPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [timeSheetOpen, setTimeSheetOpen] = useState(false)
  const [typeSheetOpen, setTypeSheetOpen] = useState(false)

  const timeLabel =
    TIME_SLOTS.find((slot) => slot.id === selectedTime)?.label ?? ''

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, ''))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !selectedDate || !selectedTime || !selectedType) {
      alert('모든 항목을 입력·선택해주세요.')
      return
    }
    alert(
      [
        '상담 예약 정보',
        `이름: ${name}`,
        `연락처: ${phone}`,
        `날짜: ${formatDisplayDate(selectedDate)}`,
        `시간: ${timeLabel}`,
        `유형: ${selectedType}`,
      ].join('\n'),
    )
  }

  return (
    <PhoneFrame>
      <StatusBar />
      <header className="page-header">
        <button type="button" className="back-btn" aria-label="뒤로 가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="hero">
          <h1>전문 상담사와 연결해드릴게요</h1>
          <p className="hero-sub">
            빠르게 상담받고 최적의 조건을 확인해보세요.
          </p>
          <div className="hero-illustration">
            <img
              src={counselorImage}
              alt="상담사 일러스트"
              className="hero-image"
            />
          </div>
        </div>
      </header>

      <main className="content">
        <form id="booking-form" className="booking-card" onSubmit={handleSubmit}>
          <h2>상담 예약 정보를 입력해주세요</h2>

          <label className="field">
            <span className="field-label">이름</span>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="field-label">연락처</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="- 없이 숫자만 입력해주세요"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              autoComplete="tel"
            />
          </label>

          <div className="field">
            <span className="field-label">상담 희망 날짜</span>
            <div className="picker-input">
              <button
                type="button"
                className={`picker-trigger ${selectedDate ? 'has-value' : ''}`}
                onClick={() => setDatePickerOpen(true)}
              >
                {selectedDate ? formatDisplayDate(selectedDate) : '날짜를 선택해주세요'}
              </button>
              <button
                type="button"
                className="picker-icon-btn"
                onClick={() => setDatePickerOpen(true)}
                aria-label="날짜 선택"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="field">
            <span className="field-label">상담 희망 시간</span>
            <div className="picker-input">
              <button
                type="button"
                className={`picker-trigger ${selectedTime ? 'has-value' : ''}`}
                onClick={() => setTimeSheetOpen(true)}
              >
                {timeLabel || '시간을 선택해주세요'}
              </button>
              <button
                type="button"
                className="picker-icon-btn chevron"
                onClick={() => setTimeSheetOpen(true)}
                aria-label="시간 선택"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="field">
            <span className="field-label">상담 유형</span>
            <div className="picker-input">
              <button
                type="button"
                className={`picker-trigger ${selectedType ? 'has-value' : ''}`}
                onClick={() => setTypeSheetOpen(true)}
              >
                {selectedType || '상담 유형을 선택해주세요'}
              </button>
              <button
                type="button"
                className="picker-icon-btn chevron"
                onClick={() => setTypeSheetOpen(true)}
                aria-label="상담 유형 선택"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </main>

      <footer className="page-footer">
        <div className="footer-wave" aria-hidden="true" />
        <button type="submit" form="booking-form" className="submit-btn">
          상담 예약하기
        </button>
      </footer>

      <DatePickerModal
        open={datePickerOpen}
        value={selectedDate}
        onClose={() => setDatePickerOpen(false)}
        onConfirm={setSelectedDate}
      />

      <BottomSheet
        open={timeSheetOpen}
        title="상담 희망 시간"
        onClose={() => setTimeSheetOpen(false)}
      >
        <ul className="scroll-options" role="listbox" aria-label="상담 희망 시간">
          {TIME_SLOTS.map((slot) => (
            <li key={slot.id}>
              <button
                type="button"
                role="option"
                aria-selected={selectedTime === slot.id}
                className={selectedTime === slot.id ? 'selected' : ''}
                onClick={() => {
                  setSelectedTime(slot.id)
                  setTimeSheetOpen(false)
                }}
              >
                {slot.label}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>

      <BottomSheet
        open={typeSheetOpen}
        title="상담 유형"
        onClose={() => setTypeSheetOpen(false)}
      >
        <ul className="scroll-options" role="listbox" aria-label="상담 유형">
          {CONSULTATION_TYPES.map((type) => (
            <li key={type}>
              <button
                type="button"
                role="option"
                aria-selected={selectedType === type}
                className={selectedType === type ? 'selected' : ''}
                onClick={() => {
                  setSelectedType(type)
                  setTypeSheetOpen(false)
                }}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </PhoneFrame>
  )
}
