type FooterButtonProps = {
  disabled: boolean
  onClick: () => void
}

export function FooterButton({ disabled, onClick }: FooterButtonProps) {
  return (
    <footer className="registry-analysis-footer">
      <button
        type="button"
        className="registry-analysis-next-btn"
        disabled={disabled}
        onClick={onClick}
      >
        다음
      </button>
    </footer>
  )
}
