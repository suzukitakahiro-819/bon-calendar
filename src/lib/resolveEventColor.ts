import dictionary from '../config/eventColorDictionary.json'

export type EventColorDictionaryEntry = {
  id: string
  label: string
  patterns: string[]
  background: string
  foreground: string
}

export type EventColorStyle = {
  backgroundColor: string
  borderColor: string
  textColor: string
}

export const EVENT_COLOR_DICTIONARY =
  dictionary as EventColorDictionaryEntry[]

export function resolveEventColorFromTitle(
  title: string,
): EventColorStyle | null {
  const entry = EVENT_COLOR_DICTIONARY.find((rule) =>
    rule.patterns.some((pattern) => title.includes(pattern)),
  )

  if (!entry) {
    return null
  }

  return {
    backgroundColor: entry.background,
    borderColor: entry.background,
    textColor: entry.foreground,
  }
}
