type FooterButtonProps = {
  onClick: () => void
}

export function FooterButton({ onClick }: FooterButtonProps) {
  return (
    <footer className="loan-amount-footer">
      <button type="button" className="loan-amount-next-btn" onClick={onClick}>
        다음
      </button>
    </footer>
  )
}
