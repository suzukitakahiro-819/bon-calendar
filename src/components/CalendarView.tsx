import { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import type { CalendarApi, EventSourceFunc } from '@fullcalendar/core'
import { renderEventContent } from './EventContent'
import { fetchGoogleCalendarEvents } from '../lib/fetchGoogleCalendarEvents'

type ViewType = 'listMonth' | 'dayGridMonth'

const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID

type CalendarViewProps = {
  currentView: ViewType
}

export function CalendarView({ currentView }: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const loadEvents: EventSourceFunc = (fetchInfo, successCallback, failureCallback) => {
    fetchGoogleCalendarEvents(
      calendarId,
      apiKey,
      fetchInfo.start,
      fetchInfo.end,
    )
      .then((events) => {
        setLoadError(null)
        successCallback(events)
      })
      .catch((error: Error) => {
        setLoadError(error.message)
        failureCallback(error)
      })
  }

  useEffect(() => {
    const calendarApi: CalendarApi | undefined =
      calendarRef.current?.getApi()
    calendarApi?.changeView(currentView)
  }, [currentView])

  if (!apiKey || !calendarId) {
    return (
      <div className="config-error">
        <p>
          環境変数 <code>VITE_GOOGLE_CALENDAR_API_KEY</code> と{' '}
          <code>VITE_GOOGLE_CALENDAR_ID</code> を設定してください。
        </p>
      </div>
    )
  }

  return (
    <div className="calendar-wrapper">
      {loadError && (
        <div className="config-error">
          <p>{loadError}</p>
        </div>
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          listPlugin,
          googleCalendarPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        locale={jaLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        googleCalendarApiKey={apiKey}
        events={loadEvents}
        height="auto"
        navLinks
        nowIndicator
        eventDisplay="block"
        displayEventTime
        dayMaxEvents={3}
        eventContent={renderEventContent}
        eventSourceFailure={(error) => {
          const message =
            error?.message ??
            'Google Calendar からイベントを取得できませんでした。'
          setLoadError(message)
        }}
      />
    </div>
  )
}
