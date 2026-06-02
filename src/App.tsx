import { useState } from 'react'
import { Legend } from './components/Legend'
import { CalendarView } from './components/CalendarView'
import { ViewToggle } from './components/ViewToggle'
import './App.css'

type ViewType = 'listMonth' | 'dayGridMonth'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dayGridMonth')

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-top">
          <h1>盆イベントカレンダー(ぼんかれ)</h1>
          <ViewToggle currentView={currentView} onChange={setCurrentView} />
        </div>
        <Legend />
        <p className="app-note">
          イベントを追加したい場合は、幹部または Discord の雑談チャンネルまで連絡してください。
        </p>
      </header>
      <main>
        <CalendarView currentView={currentView} />
      </main>
    </div>
  )
}

export default App
