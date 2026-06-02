type HeaderProps = {
  onBack: () => void
}

export function Header({ onBack }: HeaderProps) {
  return (
    <header className="cb-header">
      <button type="button" className="cb-back-btn" onClick={onBack} aria-label="뒤로 가기">
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
      <h1 className="cb-title">전문 상담사와 연결해드릴게요</h1>
      <p className="cb-subtitle">빠르게 상담받고 최적의 조건을 확인해보세요.</p>
    </header>
  )
}
