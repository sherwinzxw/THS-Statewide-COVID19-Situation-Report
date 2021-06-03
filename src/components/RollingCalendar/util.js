import { 
  addDays, 
  addMs, 
  formatToLocalDateString, 
  isLocalDateStr,
} from './../../util/date'


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
        thisDayResult = val['value']
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
      "value": input['Today -6'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -6)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -5), -1)),
    },
    {
      "value": input['Today -5'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -5)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -4), -1)),
    },
    {
      "value": input['Today -4'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -4)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -3), -1)),
    },
    {
      "value": input['Today -3'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -3)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -2), -1)),
    },
    {
      "value": input['Today -2'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -2)),
      "effectiveTo": formatToLocalDateString(addMs(addDays(thisDayStart, -1), -1)),
    },
    {
      "value": input['Today -1'],
      "effectiveFrom": formatToLocalDateString(addDays(thisDayStart, -1)),
      "effectiveTo": formatToLocalDateString(addMs(thisDayStart, -1)),
    },

    {
      "value": input['Today'],
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
}