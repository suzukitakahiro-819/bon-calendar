import { EVENT_COLOR_DICTIONARY } from '../lib/resolveEventColor'

const LEGEND_DISPLAY_ORDER = [
  'major',
  'hosted',
  'invited',
  'everyone-bon',
  'practice',
  'other',
  'tentative',
] as const

export function Legend() {
  const items = [...EVENT_COLOR_DICTIONARY].sort(
    (a, b) =>
      LEGEND_DISPLAY_ORDER.indexOf(
        a.id as (typeof LEGEND_DISPLAY_ORDER)[number],
      ) -
      LEGEND_DISPLAY_ORDER.indexOf(
        b.id as (typeof LEGEND_DISPLAY_ORDER)[number],
      ),
  )

  return (
    <ul className="legend">
      {items.map((item) => (
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
