type FooterButtonProps = {
  onClick: () => void
}

export function FooterButton({ onClick }: FooterButtonProps) {
  return (
    <footer className="intro-footer">
      <button type="button" className="intro-cta" onClick={onClick}>
        <span className="intro-cta-label">내 조건 확인하기</span>
        <svg
          className="intro-cta-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  )
}
