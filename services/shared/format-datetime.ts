type Options = {
  locale?: string
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
}

export function formatDateTime(
  isoUtcString: string,
  { locale = 'ja-JP', dateStyle = 'medium', timeStyle = 'short' }: Options = {}
) {
  const date = new Date(isoUtcString)
  if (Number.isNaN(date.getTime())) return isoUtcString

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    timeZone: 'Asia/Tokyo',
  }).format(date)
}
