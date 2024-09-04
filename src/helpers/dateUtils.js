export function formatDateToTimeZone(date, timeZone, options = {}) {
  console.log('Date format func: ', date);
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    ...options,
  }).format(new Date(date));
}
