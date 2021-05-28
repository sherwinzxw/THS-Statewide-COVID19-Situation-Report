
export const mapRollingCalendarInputToTableInput = (params) => {
  const { now: nowStr, input } = params
  if (isLocalDateStr(nowStr) == false)
    throw new Error('\'now\' must be a local date.')

  var now = new Date(nowStr)
  var thisDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  var resultObj = {}
  var inputClone = input.slice(0)
  var day = 0
  do {

    var thisDayResult = null
    for (var i = inputClone.length - 1; i >= 0; i--){
      var val = inputClone[i]
      if (isLocalDateStr(val.effectiveFrom) == false)
        throw new Error('Expected \'effectiveFrom\' to be a local date string.')
      var from = new Date(val.effectiveFrom)
      if (from >= thisDayStart){
        thisDayResult = val['inputValue']
      }
    }
    if (!thisDayResult)
      thisDayResult = ''

    resultObj['Today' + (day ? (' ' + day) : '')] = thisDayResult
    thisDayStart.setDate(thisDayStart.getDate() - 1)
    day--
  } while (day > -7);
  return resultObj
}

export const mapTableInputToRollingCalendarInput = (params) => {
  const { now: nowStr, input } = params
  if (isLocalDateStr(nowStr) == false)
    throw new Error('\'now\' must be a local date.')

  var now = new Date(nowStr)
  var thisDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return [
    {
      "inputValue": input['Today -6'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -6)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -5), -1)),
    },
    {
      "inputValue": input['Today -5'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -5)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -4), -1)),
    },
    {
      "inputValue": input['Today -4'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -4)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -3), -1)),
    },
    {
      "inputValue": input['Today -3'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -3)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -2), -1)),
    },
    {
      "inputValue": input['Today -2'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -2)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -1), -1)),
    },
    {
      "inputValue": input['Today -1'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -1)),
      "effectiveTo": formatToLocalDateString(addMs(thisDayStart, -1)),
    },

    {
      "inputValue": input['Today'],
      "effectiveFrom": formatToLocalDateString(thisDayStart),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, 1), -1)),
    }
  ]
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

export function padZero(str, length = 2){
  str = String(str)
  while (str.length < length){
    str = '0' + str
  }
  return str
}

function padZeroFromEnd(str, length = 2){
  str = String(str)
  while (str.length < length){
    str = str + '0'
  }
  return str
}


function addDays(date, days){
  var newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

function addMs(date, ms){
  var newDate = new Date(date)
  newDate.setMilliseconds(newDate.getMilliseconds() + ms)
  return newDate
}