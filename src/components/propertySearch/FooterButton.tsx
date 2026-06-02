type FooterButtonProps = {
  disabled: boolean
  onClick: () => void
}

export function FooterButton({ disabled, onClick }: FooterButtonProps) {
  return (
    <footer className="property-search-footer">
      <button
        type="button"
        className="property-search-next-btn"
        disabled={disabled}
        onClick={onClick}
      >
        다음
      </button>
    </footer>
  )
}
