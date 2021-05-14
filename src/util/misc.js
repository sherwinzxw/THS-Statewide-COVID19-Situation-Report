

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
 * Removes all the 'Confirmed cases in the last week' controls and injects
 * a single control that represents all of that data.
 */
export const combineConfirmedCasesControls = function(params){
  var { layout, } = params

  var controlMap = {
    'Control_3B3D35A2-8C39-487C-AB06-736D71A073B6': 'South - Posivite cases confirmed',
    'Control_F46C08D4-BB51-4CBF-AFB3-BA2519252E1B': 'South - Deaths in last week',
    'Control_904210D0-9CC4-4298-BF23-31E8CEFEEF25': 'South - Total confirmed cases',
    'Control_111EB15A-EE0D-4D8E-B3A9-0E2F39782A61': 'South -  Total deaths - Cumulative since 2 March 2020*',
    'Control_94E01147-F0ED-4AC6-983C-BE6E0A46EB87': 'South - Total people recovered - Cumulative since 2 March 2020*',
    'Control_5E982503-F1D3-4ADC-A2B1-E8001E592720': 'South - Total active cases  - Cumulative since 2 March 2020*',
    'Control_6352161E-6170-429E-89D2-4E152691164B': 'South - Total tests conducted  - Cumulative since 2 March 2020*',
    'Control_4CD3F3A6-8397-437D-A0B4-9BA95208DECB': 'North - Posivite cases confirmed',
    'Control_AF30CECA-3E68-4338-A640-14F9EB0FB09E': 'North - Deaths in last week',
    'Control_0EF538C6-B9A7-4B90-89C8-0723DC0F0D97': 'North - Total confirmed cases',
    'Control_81E1F614-4F15-4A69-8920-2D075728C21C': 'North -  Total deaths - Cumulative since 2 March 2020*',
    'Control_ACD4329E-48C2-486A-A9E9-ABB63023D8C3': 'North - Total people recovered - Cumulative since 2 March 2020*',
    'Control_DEB99787-F6A8-48E7-B045-2908DD4AD367': 'North - Total active cases  - Cumulative since 2 March 2020*',
    'Control_D1A93575-A394-43B3-9DE2-EF23D42D5973': 'North - Total tests conducted  - Cumulative since 2 March 2020*',
    'Control_E5BF361C-D328-492E-AED5-90E11BD1D0D7': 'North West - Posivite cases confirmed',
    'Control_0C3D74DC-4F87-4077-BB98-6516AD1B47CB': 'North West - Deaths in last week',
    'Control_B2DC2D5B-A217-45CB-AED2-978930437FFD': 'North West - Total confirmed cases',
    'Control_1D78D5A2-E620-4B6D-8729-8056C428BB87': 'North West -  Total deaths - Cumulative since 2 March 2020*',
    'Control_9D702387-244F-4748-968A-0B9AC55FD716': 'North West - Total people recovered - Cumulative since 2 March 2020*',
    'Control_89F54E00-467D-4392-B17E-E450E1E827F0': 'North West - Total active cases  - Cumulative since 2 March 2020*',
    'Control_855593B9-B5BD-4EB4-871B-8FADD45B66BA': 'North West - Total tests conducted  - Cumulative since 2 March 2020*',
    'Control_E39C5484-F78E-49A1-95CC-AB552ED44925': 'Interstate - Posivite cases confirmed',
    'Control_05239EAB-4202-4E37-BC42-BE8176617395': 'Interstate - Deaths in last week',
    'Control_E5FDD7B8-07C6-46C5-9F6C-656873959E13': 'Interstate - Total confirmed cases',
    'Control_DA771621-81A6-4C3A-8FBB-1BB5605E9CD7': 'Interstate -  Total deaths - Cumulative since 2 March 2020*',
    'Control_42C33BBB-3E2F-4109-8726-56235E54911B': 'Interstate - Total people recovered - Cumulative since 2 March 2020*',
    'Control_24FE2C2E-DDFF-4BD3-99C4-2ABD735A9AF1': 'Interstate - Total active cases  - Cumulative since 2 March 2020*',
    'Control_563B3B82-D37A-4155-BD72-0504C4038E9D': 'Interstate - Total tests conducted  - Cumulative since 2 March 2020*',
    'Control_FCE9F38B-20FE-4DB7-9555-D3BD42D92481': 'Not Reported - Posivite cases confirmed',
    'Control_C800C1CF-7989-4C5D-8C77-E1C64477343C': 'Not Reported - Deaths in last week',
    'Control_AFACC80B-80EA-412A-BF2F-207327BAF507': 'Not Reported - Total confirmed cases',
    'Control_077F4294-2122-4E7F-BA6B-21794EBE2A62': 'Not Reported -  Total deaths - Cumulative since 2 March 2020*',
    'Control_6E1FA739-39EF-4025-A716-A790611FFEC6': 'Not Reported - Total people recovered - Cumulative since 2 March 2020*',
    'Control_9AE832FF-803A-4C7D-814A-7DCDCB1FF4CC': 'Not Reported - Total active cases  - Cumulative since 2 March 2020*',
    'Control_B4D5D8A8-2123-4485-AA6A-AFFC7F73721A': 'Not Reported - Total tests conducted  - Cumulative since 2 March 2020*'
  }

  
  var replacePoint = layout.findIndex(control => {
    return !!controlMap[control.key]
  })
  // If we don't find any of the respective controls then don't inject this
  // custom control
  if (replacePoint == -1)
    return layout

  layout = layout.slice(0)

  var valuesMap = {}
  layout = layout.filter(control => {
    // Hijack this loop to create a hashmap of values too.
    valuesMap[control.key] = control.value
    return !controlMap[control.key]
  })

  // Add the custom control
  layout.splice(replacePoint, 0, {
    type: 'ConfirmedCases',
    key: 'ConfirmedCases',
    value: valuesMap,
  })

  return layout

}