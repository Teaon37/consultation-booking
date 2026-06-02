type HeaderProps = {
  onBack: () => void
}

export function Header({ onBack }: HeaderProps) {
  return (
    <header className="loan-amount-header">
      <button type="button" className="loan-amount-back-btn" onClick={onBack} aria-label="뒤로 가기">
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
      <h1 className="loan-amount-title">얼마가 필요하신가요?</h1>
    </header>
  )
}
