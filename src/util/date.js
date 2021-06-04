import { padZero, padZeroFromEnd } from './misc'

/**
 * Returns the date and month of a date e.g. 14/05, typically used for 
 * rolling calendar headers.
 * @param {Date} date
 * @return {string}
 */
export function formatToShortDateMonth(date){
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}`
}


export const isLocalDateStr = str => {
  var date = new Date(str)
  if (isNaN(date))
    throw new Error('Date string is invalid.')
  //["2021-05-16T23:59:59.99","2021","05","16","T","23",":59","59",":59","59",".99","99"]
  var [z ,year, month, dateStr, a, hours = 0, b, minutes = 0, c, seconds = 0, d, ms = 0] = 
    str.match(/(\d{4})-(\d{2})-(\d{2})(.{1})?(\d{2})?(:(\d{2}))?(:(\d{2}))?(.(\d{1,3}))?/)
  //console.log(parts)

  /*console.log('isLocalDateStr#condition', `
    ${date.getFullYear()} == ${Number(year)} &&
    ${date.getMonth()} == ${(Number(month) - 1)} &&
    ${date.getDate()} == ${Number(dateStr)} &&
    ${date.getHours()} == ${Number(hours)} &&
    ${date.getMinutes()} == ${Number(minutes)} &&
    ${date.getSeconds()} == ${Number(seconds)} &&
    ${date.getMilliseconds()} == ${Number(padZero(ms, 3))}
  `)*/

  return date.getFullYear() == Number(year) &&
    date.getMonth() == (Number(month) - 1) &&
    date.getDate() == Number(dateStr) &&
    (!hours || date.getHours() == Number(hours)) &&
    (!minutes || date.getMinutes() == Number(minutes)) &&
    (!seconds || date.getSeconds() == Number(seconds)) &&
    (!ms || date.getMilliseconds() == Number(padZeroFromEnd(ms, 3)))

}

/**
 * @param {Date} d
 */
export const formatToLocalDateString = d => {
  if (d instanceof Date == false || isNaN(d))
    throw new Error('Date is invalid.')
    
  return d.getFullYear() + '-' + 
    padZero(d.getMonth() + 1) + '-' + 
    padZero(d.getDate()) + ' ' +
    padZero(d.getHours()) + ':' + 
    padZero(d.getMinutes()) + ':' + 
    padZero(d.getSeconds()) + '.' +
    padZeroFromEnd(d.getMilliseconds(), 3)
}



export function addDays(date, days){
  var newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export function addMs(date, ms){
  var newDate = new Date(date)
  newDate.setMilliseconds(newDate.getMilliseconds() + ms)
  return newDate
}

export function getStartOfDay(date){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Formats a date object into a readable date string.
 * @param {Date} date
 * @returns {string}
 */
export function formatToReadableDateTime(d){
  return formatToReadableDate(d) + ' ' + formatToReadableTime(d)
}

/**
 * Formats a date object into a readable date string. e.g 04/06/2021
 * @param {Date} date
 * @returns {string}
 */
export function formatToReadableDate(d){
  if (d instanceof Date == false || isNaN(d))
    throw new Error('Date is invalid.')
  
  return padZero(d.getDate()) + '/' + 
    padZero(d.getMonth() + 1) + '/' + 
    d.getFullYear()
}


/**
 * Get a date's time in a readable format eg. 11AM, 1PM
 * If its noon it will return 'Noon' and 'Midnight' for 12AM so avoid
 * ambiguity between AM and PM
 * @param {date} date
 * @param {boolean} unambiguous12hour Defaults to true, when specified shows
 * 12:00 as Noon and 00:00 as midnight else sticks to 12:00 and 00:00
 * @returns {string}
 */
export function formatToReadableTime(date, unambiguous12hour = true){
  if (date instanceof Date == false || isNaN(date))
    throw new Error('Date is invalid.')
  
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var meridiem = hours / 12 >= 1 ? 'PM' : 'AM'
  if (minutes == 0) {
    if (unambiguous12hour) {
      if (hours == 0) return 'Midnight'
      if (hours == 12) return 'Noon'
    }
    if (meridiem == 'PM') {
      hours = hours - 12
      return hours + 'PM'
    }
    return hours + 'AM'
  }
  // Format the minutes to 2dp
  minutes += ''
  if (minutes.length == 1) minutes = '0' + minutes

  return hours + '.' + minutes + meridiem
}
