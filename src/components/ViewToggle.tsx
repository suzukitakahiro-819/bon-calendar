type ViewType = 'listMonth' | 'dayGridMonth'

type ViewToggleProps = {
  currentView: ViewType
  onChange: (view: ViewType) => void
}

export function ViewToggle({ currentView, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle" role="group" aria-label="表示形式の切り替え">
      <button
        type="button"
        className={currentView === 'listMonth' ? 'active' : ''}
        onClick={() => onChange('listMonth')}
        aria-pressed={currentView === 'listMonth'}
      >
        リスト
      </button>
      <button
        type="button"
        className={currentView === 'dayGridMonth' ? 'active' : ''}
        onClick={() => onChange('dayGridMonth')}
        aria-pressed={currentView === 'dayGridMonth'}
      >
        月
      </button>
    </div>
  )
}
