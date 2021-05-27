
/**
 * Split an array of objects by a specific key value.
 * Returns an object where the value of each key are all the items with the
 * same key value.
 * The split key must be a string.
 */
export const splitObjectsByKeyValue = function(arr, splitKey){
  var result = {}
  arr.forEach(item => {
    var keyValue = item[splitKey]
    if (keyValue === null || keyValue === undefined)
      throw new Error('Split key value should not be null or undefined.')
    result[keyValue] = result[keyValue] || []
    result[keyValue].push(item)
  })
  return result
}

/**
 * Only calls a function after the specified wait time, if the function is
 * called again before the wait time then all previous calls are disregarded.
 */
export const debounce = function(func, waitMs){
  var timeout
  return function(){
    var context = this
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, waitMs)
  }
}

/**
 * Iterates over an array and calls the func for each item. Assumes the func
 * will return a Promise, ensures only X (chunkSize) promises are active
 * at any one time.
 */
export const iteratePromiseChunks = function(arr, func, chunkSize){
  
  return new Promise((resolve, reject) => {
    try {
      arr = arr.slice(0)
      if (chunkSize <= 0)
        throw new Error(`'chunkSize' must be more than 0.`)
      var activePromises = []

      var maybeProcessNext = () => {
        if (activePromises.length >= chunkSize) return
        if (arr.length == 0)
          return
        var nextRecord = arr.shift()
        var p = func(nextRecord)
        .then(() => {
          var pIndex = activePromises.findIndex(p2 => p2 == p)
          if (pIndex == -1)
            throw new Error('Cannot find promise.')
          activePromises.splice(pIndex, 1)
          if (activePromises.length == 0 && arr.length == 0){
            resolve()
          } else {
            maybeProcessNext()
          }
        }).catch(reject)
        activePromises.push(p)
      }

      var concurrentLimit = chunkSize
      while(concurrentLimit){
        concurrentLimit--
        maybeProcessNext()
      }
    } catch (err){
      reject(err)
    }
  })
}

/**
 * Exports a CSV file in the browser.
 */
export const exportCSV = function(csvData, filename = 'example.csv'){
  var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  var link = document.createElement("a")
  var url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", "test.csv")
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const escapeCsvStr = function(str = ''){
  str = str.replace(/"/g, '""')
  if (str.indexOf(',') != -1 || str.indexOf('"') != -1)
    str = '"' + str + '"'
  return str
}

export const convertObjToCsv = function(obj){
  var csvString = ''
  csvString += Object.keys(obj).map(escapeCsvStr) + '\n'
  csvString += Object.values(obj).map(escapeCsvStr)
  return csvString
}

export const convertCsvToObj = function(csv){
  
  var lines = csv.split('\n')
  var parts = lines.map((line, index) => parseCsvLine(line, index + 1))
  if (!parts[0] || !parts[1])
    throw new Error('Expected 2 lines for CSV.')
  var obj = {}
  parts[0].forEach((key, index) => {
    obj[key] = parts[1][index]
  })
  return obj
}

export const parseCsvLine = function(csvLine, lineNo){

  var chars = csvLine.split('')
  var cells = []
  var currentCell = ''
  var quoteStart = false, escapeQuoteStart = false
  chars.forEach((c, i) => {
    if (c == '"'){
      if (currentCell.length == 0){
        quoteStart = true
        currentCell += '"'
        return
      } else if (escapeQuoteStart) {
        if (currentCell.slice(-1) != '"')
          throw new Error(`Invalid quote escape sequence at${
            line ? ` lineNo ${lineNo},` : ''
          } character ${
            (i + 1)}.`)
        escapeQuoteStart = false 
      } else {
        escapeQuoteStart = true
      }
    }
    if (c == ','){
      if (quoteStart && escapeQuoteStart){
        // Should terminate because previous character was a "
        cells.push(currentCell.slice(1, -1).replace(/""/g, '"'))
        quoteStart = false
        escapeQuoteStart = false
        currentCell = ''
        return
      }
      if (!quoteStart){
        cells.push(currentCell)
        quoteStart = false
        escapeQuoteStart = false
        currentCell = ''
        return
      }
    }
    currentCell += c
  })
  if (quoteStart && escapeQuoteStart){
    cells.push(currentCell.slice(1, -1).replace(/""/g, '"'))
  } else { 
    cells.push(currentCell)
  } 
  return cells

}

/**
 * Returns a new object with the keys and values swapped.
 */
export const swapKeysWithValues = function(obj){
  var newObj = {}
  Object.entries(obj).forEach(([key, value]) => newObj[value] = key)
  return newObj
}

export const isValidControl = function(control){
  if (!control.fk_ViewIdentifier){
    console.error(new Error(`
      Control ${control.controlIdentifier} is invalid. It has no 
      fk_viewIdentifier.
    `.replace(/\s+/g, ' ')))
    return false
  }
  return true
}

export const formatNumber = function(num){
  var str = String(num)
  var formattedStr = ''
  while (str.length){
    formattedStr = ',' + str.slice(-3) + formattedStr
    str = str.slice(0, -3)
  }
  return formattedStr.slice(1)
}

export const parseIntOrZero = function(str){
  if (/[^0-9]/.test(str))
    return 0
  return Number(str)
}
