import type { EventInput } from '@fullcalendar/core'
import { getEventColors } from './googleCalendarColors'

type GoogleCalendarEventItem = {
  id: string
  summary?: string
  colorId?: string
  htmlLink?: string
  location?: string
  description?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

type GoogleCalendarEventsResponse = {
  items?: GoogleCalendarEventItem[]
  error?: { message: string }
}

function buildEventsUrl(calendarId: string, apiKey: string, start: Date, end: Date) {
  const params = new URLSearchParams({
    key: apiKey,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: 'true',
    maxResults: '9999',
    timeZone: 'Asia/Tokyo',
  })

  return `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`
}

function toEventInput(item: GoogleCalendarEventItem): EventInput {
  const colors = getEventColors(item.colorId)

  return {
    id: item.id,
    title: item.summary ?? '(タイトルなし)',
    start: item.start.dateTime ?? item.start.date ?? '',
    end: item.end.dateTime ?? item.end.date,
    url: item.htmlLink,
    ...colors,
  }
}

export async function fetchGoogleCalendarEvents(
  calendarId: string,
  apiKey: string,
  start: Date,
  end: Date,
): Promise<EventInput[]> {
  const response = await fetch(buildEventsUrl(calendarId, apiKey, start, end))
  const body = (await response.json()) as GoogleCalendarEventsResponse

  if (!response.ok || body.error) {
    throw new Error(
      body.error?.message ??
        'Google Calendar からイベントを取得できませんでした。',
    )
  }

  return (body.items ?? []).map(toEventInput)
}
