const LEGEND_ITEMS = [
  { color: '#16a34a', label: '右近屋系大イベント・合宿' },
  { color: '#2563eb', label: '主催イベント' },
  { color: '#ca8a04', label: 'お呼ばれイベント' },
  { color: '#ea580c', label: '野良盆' },
  { color: '#dc2626', label: '野良盆［確定］' },
  { color: '#9333ea', label: '練習会' },
] as const

export function Legend() {
  return (
    <ul className="legend">
      {LEGEND_ITEMS.map((item) => (
        <li key={item.label} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
