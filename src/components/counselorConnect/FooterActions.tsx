type FooterActionsProps = {
  onBook: () => void
  onSkip: () => void
}

export function FooterActions({ onBook, onSkip }: FooterActionsProps) {
  return (
    <footer className="counselor-connect-footer">
      <button type="button" className="counselor-connect-book-btn" onClick={onBook}>
        상담 예약하기
      </button>
      <button type="button" className="counselor-connect-skip-btn" onClick={onSkip}>
        나중에 할게요
      </button>
    </footer>
  )
}
