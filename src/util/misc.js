

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
 * Iterate over a schema and run a function over each control and replace the
 * control with what's returned from the function.
 */
export const runOnControl = function(schema, controlMapFunc){
  return {
    ...schema,
    layout: schema.layout.map(page => ({
      ...page,
      layout: page.layout.map(form => ({
        ...form,
        layout: form.layout.map(controlMapFunc)
      }))
    }))
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