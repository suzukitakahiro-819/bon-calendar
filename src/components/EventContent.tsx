import type { EventContentArg } from '@fullcalendar/core'

export function renderEventContent(eventInfo: EventContentArg) {
  const timeText = eventInfo.timeText || '終日'

  return (
    <div className="event-content">
      <div className="event-content-time">{timeText}</div>
      <div className="event-content-title">{eventInfo.event.title}</div>
    </div>
  )
}
