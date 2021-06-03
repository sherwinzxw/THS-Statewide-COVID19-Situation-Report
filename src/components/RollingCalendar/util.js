import { 
  addDays, 
  addMs, 
  formatToLocalDateString, 
  isLocalDateStr,
} from './../../util/date'


export const mapRollingCalendarInputToTableInput = (params) => {
  const { dayStr, input } = params
  if (isLocalDateStr(dayStr) == false)
    throw new Error('\'dayStr\' must be a local date string.')

  var day = new Date(dayStr)
  var thisDayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  var resultObj = {}
  var inputClone = input.slice(0)
  var dayIndex = 0
  do {

    var thisDayResult = null
    for (var i = inputClone.length - 1; i >= 0; i--){
      var val = inputClone[i]
      if (isLocalDateStr(val.effectiveFrom) == false)
        throw new Error('Expected \'effectiveFrom\' to be a local date string.')
      var from = new Date(val.effectiveFrom)
      if (from >= thisDayStart){
        thisDayResult = val['value']
      }
    }
    if (!thisDayResult)
      thisDayResult = ''

    resultObj['Day' + (dayIndex ? (' ' + dayIndex) : '')] = thisDayResult
    thisDayStart.setDate(thisDayStart.getDate() - 1)
    dayIndex--
  } while (dayIndex > -7);
  return resultObj
}

export const mapTableInputToRollingCalendarInput = (params) => {
  const { dayStr, input } = params
  if (isLocalDateStr(dayStr) == false)
    throw new Error('\'dayStr\' must be a local date.')

  var day = new Date(dayStr)
  var thisDayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  return [
    {
      "value": input['Day -6'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -6)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -5), -1)),
    },
    {
      "value": input['Day -5'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -5)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -4), -1)),
    },
    {
      "value": input['Day -4'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -4)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -3), -1)),
    },
    {
      "value": input['Day -3'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -3)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -2), -1)),
    },
    {
      "value": input['Day -2'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -2)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -1), -1)),
    },
    {
      "value": input['Day -1'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -1)),
      "effectiveTo": formatToLocalDateString(addMs(thisDayStart, -1)),
    },

    {
      "value": input['Day'],
      "effectiveFrom": formatToLocalDateString(thisDayStart),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, 1), -1)),
    }
  ]
}



export const validateRollingCalValue = (value) => {

  if (value === null || value === undefined) return
  if (value instanceof Array === false)
    throw new Error('Expected Array for rolling calendar value')
  value.forEach(validateRollingCalItem)
}

const validateRollingCalItem = item => {
  const { effectiveFrom, effectiveTo } = item
  if (typeof effectiveFrom !== 'string')
    throw new Error('Expected string type for rolling calendar \'effectiveFrom\'.')
  if (typeof effectiveTo !== 'string')
    throw new Error('Expected string type for rolling calendar \'effectiveTo\'.')
  if (item.hasOwnProperty('value') == false)
    throw new Error('Expected rolling calendar items to have a \'value\' prop.')
}