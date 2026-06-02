type FooterButtonProps = {
  onClick: () => void
}

export function FooterButton({ onClick }: FooterButtonProps) {
  return (
    <footer className="loan-type-footer">
      <button type="button" className="loan-type-next-btn" onClick={onClick}>
        다음
      </button>
    </footer>
  )
}
