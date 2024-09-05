export function formatDateToTimeZone(date, timeZone, options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    ...options,
  }).format(new Date(date));
}
