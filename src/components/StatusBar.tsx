import statusBarImage from '../assets/status-bar.png'
import '../styles/status-bar.css'

export function StatusBar() {
  return (
    <img
      src={statusBarImage}
      alt=""
      className="status-bar-image"
      width={390}
      height={44}
      aria-hidden="true"
    />
  )
}
