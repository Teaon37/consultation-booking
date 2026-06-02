function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4C9.239 4 7 6.239 7 9V10.5L5.5 13.5H18.5L17 10.5V9C17 6.239 14.761 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 17.5C10 18.881 10.895 20 12 20C13.105 20 14 18.881 14 17.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function NoticeBox() {
  return (
    <aside className="cc-notice" aria-label="안내">
      <div className="cc-notice-head">
        <span className="cc-notice-icon">
          <BellIcon />
        </span>
        <strong className="cc-notice-title">알려드려요</strong>
      </div>
      <p className="cc-notice-text">
        입력하신 연락처로 상담사 배정 및 상담 관련 안내를 문자 또는 전화로 드릴 예정입니다.
      </p>
    </aside>
  )
}
