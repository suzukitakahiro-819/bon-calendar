import { GOOGLE_EVENT_COLORS } from '../lib/googleCalendarColors'

const LEGEND_ITEMS = [
  { colorId: '10', label: '右近屋系大イベント・合宿' },
  { colorId: '9', label: '主催イベント' },
  { colorId: '5', label: 'お呼ばれイベント' },
  { colorId: '6', label: '野良盆' },
  { colorId: '11', label: '野良盆［確定］' },
  { colorId: '3', label: '練習会' },
] as const

export function Legend() {
  return (
    <ul className="legend">
      {LEGEND_ITEMS.map((item) => (
        <li key={item.label} className="legend-item">
          <span
            className="legend-color"
            style={{
              backgroundColor: GOOGLE_EVENT_COLORS[item.colorId].background,
            }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
