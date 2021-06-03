var methods = require('./misc')

describe('misc', () => {
  describe('splitObjectsByKeyValue()', () => {
    it('should split array of objects by key value', () => {

      var testObjects = [
        {
          name: 'Sally',
          favouriteColour: 'red',
        },
        {
          name: 'Bill',
          favouriteColour: 'blue',
        },
        {
          name: 'Ben',
          favouriteColour: 'blue',
        }
      ]
      var result = methods.splitObjectsByKeyValue(
        testObjects, 
        'favouriteColour',
      )
      expect(result).toEqual({
        'red': [
          {
            name: 'Sally',
            favouriteColour: 'red',
          }
        ],
        'blue': [
          {
            name: 'Bill',
            favouriteColour: 'blue',
          },
          {
            name: 'Ben',
            favouriteColour: 'blue',
          }
        ]
      })

    })
  })

  describe('escapeCsvStr()', () => {
    it('should escape a comma', () => {
      var str = 'Hello, World'
      var result = methods.escapeCsvStr(str)
      expect(result).toBe('"Hello, World"')
    })
    it('should escape a quote', () => {
      var str = 'Foobar "'
      var result = methods.escapeCsvStr(str)
      expect(result).toBe('"Foobar """')
    })
    it('should leave a valid string untouched', () => {
      var str = '123'
      var result = methods.escapeCsvStr(str)
      expect(result).toBe('123')
    })
  })

  describe('parseCsvLine()', () => {
    it('should parse a csv line with escaped values', () => {
      var line = '"Hello, World",123,"Foobar """'
      var cells = methods.parseCsvLine(line)
      expect(cells).toEqual([
        'Hello, World',
        '123',
        'Foobar "',
      ])
    })

    it('should parse a csv line with empty values', () => {
      var line = ',,'
      var cells = methods.parseCsvLine(line)
      expect(cells).toEqual([
        '',
        '',
        '',
      ])
    })
  })

  describe('convertCsvToObj()', () => {
    it('should parse a csv file with empty values', () => {
      var csvFile = 'Report number,Report frequency,Date and time of distribution,Prepared by' + 
        '\n,,,'
      var obj = methods.convertCsvToObj(csvFile)
      expect(obj).toEqual({
        'Report number':'',
        'Report frequency':'',
        'Date and time of distribution':'',
        'Prepared by':''
      })
    })
  })

  describe('formatNumber()', () => {
    it('should format 1000', () => {
      var result = methods.formatNumber(1000)
      expect(result).toBe('1,000')
    })
    it('should format 100', () => {
      var result = methods.formatNumber(100)
      expect(result).toBe('100')
    })
    it('should format 10000', () => {
      var result = methods.formatNumber(10000)
      expect(result).toBe('10,000')
    })
    it('should format 0', () => {
      var result = methods.formatNumber(0)
      expect(result).toBe('0')
    })
    it('should format 9999999', () => {
      var result = methods.formatNumber(9999999)
      expect(result).toBe('9,999,999')
    })
  })

  describe('parseIntOrZero()', () => {
    it('should parse 0', () => {
      var result = methods.parseIntOrZero('0')
      expect(result).toBe(0)
    })
    it('should parse 10', () => {
      var result = methods.parseIntOrZero('10')
      expect(result).toBe(10)
    })
    it('should not parse alpha characters', () => {
      var result = methods.parseIntOrZero('q03s')
      expect(result).toBe(0)
    })
    it('should still parse a number with errounous whitespace', () => {
      var result = methods.parseIntOrZero('345\n')
      expect(result).toBe(345)
    })
  })

  describe('#padZero', () => {
    it('should pad a zero', () => {
      var result = methods.padZero(5)
      expect(result).toBe('05')
    })
  })
})