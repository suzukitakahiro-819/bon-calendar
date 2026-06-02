import { EVENT_COLOR_DICTIONARY } from '../lib/resolveEventColor'

export function Legend() {
  return (
    <ul className="legend">
      {EVENT_COLOR_DICTIONARY.map((item) => (
        <li key={item.id} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.background }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
