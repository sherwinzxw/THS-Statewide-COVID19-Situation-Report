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
