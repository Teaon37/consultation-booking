type AddressInputProps = {
  value: string
  onChange: (value: string) => void
}

export function AddressInput({ value, onChange }: AddressInputProps) {
  return (
    <div className="property-search-field">
      <label className="property-search-label" htmlFor="property-address">
        주소 검색
      </label>
      <p className="property-search-hint">(예 : &apos;서울시&apos;를 타이핑해주세요.)</p>
      <div className="property-search-input-wrap">
        <svg
          className="property-search-input-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          id="property-address"
          type="text"
          className="property-search-input"
          placeholder="서울시"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="street-address"
        />
      </div>
    </div>
  )
}
