import * as methods from './util'

describe('RollingCalendar#util', () => {
  describe('#mapRollingCalendarInputToTableInput', () => {
    it('should map rolling calendar data to table data', () => {
      var input = [
        {
          "inputValue": "100",
          "effectiveFrom": "2021-05-10T00:00:00.00",
          "effectiveTo": "2021-05-10T23:59:59.99"
        },
        {
          "inputValue": "200",
          "effectiveFrom": "2021-05-11T00:00:00.00",
          "effectiveTo": "2021-05-11 23:59:59.99"
        },
        {
          "inputValue": "300",
          "effectiveFrom": "2021-05-12T00:00:00.00",
          "effectiveTo": "2021-05-12T23:59:59.99"
        },
        {
          "inputValue": "400",
          "effectiveFrom": "2021-05-13T00:00:00.00",
          "effectiveTo": "2021-05-13T23:59:59.99"
        },
        {
          "inputValue": "500",
          "effectiveFrom": "2021-05-14T00:00:00.00",
          "effectiveTo": "2021-05-14T23:59:59.99"
        },
        {
          "inputValue": "600",
          "effectiveFrom": "2021-05-15T00:00:00.00",
          "effectiveTo": "2021-05-15T23:59:59.99"
        },
        {
          "inputValue": "700",
          "effectiveFrom": "2021-05-16T00:00:00.00",
          "effectiveTo": "2021-05-16T23:59:59.99"
        }
      ]

      var now = '2021-05-16 16:00:00'

      var result = methods.mapRollingCalendarInputToTableInput({ input, now })
      expect(result).toEqual({
        'Today -6': '100',
        'Today -5': '200',
        'Today -4': '300',
        'Today -3': '400',
        'Today -2': '500',
        'Today -1': '600',
        'Today': '700',
      })
    })

    it('should shift everything back by one if today is the next day on', () => {
      var input = [
        {
          "inputValue": "100",
          "effectiveFrom": "2021-05-10T00:00:00.00",
          "effectiveTo": "2021-05-10T23:59:59.99"
        },
        {
          "inputValue": "200",
          "effectiveFrom": "2021-05-11T00:00:00.00",
          "effectiveTo": "2021-05-11 23:59:59.99"
        },
        {
          "inputValue": "300",
          "effectiveFrom": "2021-05-12T00:00:00.00",
          "effectiveTo": "2021-05-12T23:59:59.99"
        },
        {
          "inputValue": "400",
          "effectiveFrom": "2021-05-13T00:00:00.00",
          "effectiveTo": "2021-05-13T23:59:59.99"
        },
        {
          "inputValue": "500",
          "effectiveFrom": "2021-05-14T00:00:00.00",
          "effectiveTo": "2021-05-14T23:59:59.99"
        },
        {
          "inputValue": "600",
          "effectiveFrom": "2021-05-15T00:00:00.00",
          "effectiveTo": "2021-05-15T23:59:59.99"
        },
        {
          "inputValue": "700",
          "effectiveFrom": "2021-05-16T00:00:00.00",
          "effectiveTo": "2021-05-16T23:59:59.99"
        }
      ]

      var now = '2021-05-17 16:00:00'

      var result = methods.mapRollingCalendarInputToTableInput({ input, now })
      expect(result).toEqual({
        'Today -6': '200',
        'Today -5': '300',
        'Today -4': '400',
        'Today -3': '500',
        'Today -2': '600',
        'Today -1': '700',
        'Today': '',
      })
    })
  })

  describe('#mapTableInputToRollingCalendarInput', () => {
    it('should map table values to the input the server wants', () => {
      var tableInput = {
        'Today -6': '100',
        'Today -5': '200',
        'Today -4': '300',
        'Today -3': '400',
        'Today -2': '500',
        'Today -1': '600',
        'Today': '700',
      }
      var now = '2021-05-16 17:00:00.00'
      var result = methods.mapTableInputToRollingCalendarInput({ 
        input: tableInput,
        now,
      })
      expect(result).toEqual([
        {
          "inputValue": "100",
          "effectiveFrom": "2021-05-10 00:00:00.000",
          "effectiveTo": "2021-05-10 23:59:59.999"
        },
        {
          "inputValue": "200",
          "effectiveFrom": "2021-05-11 00:00:00.000",
          "effectiveTo": "2021-05-11 23:59:59.999"
        },
        {
          "inputValue": "300",
          "effectiveFrom": "2021-05-12 00:00:00.000",
          "effectiveTo": "2021-05-12 23:59:59.999"
        },
        {
          "inputValue": "400",
          "effectiveFrom": "2021-05-13 00:00:00.000",
          "effectiveTo": "2021-05-13 23:59:59.999"
        },
        {
          "inputValue": "500",
          "effectiveFrom": "2021-05-14 00:00:00.000",
          "effectiveTo": "2021-05-14 23:59:59.999"
        },
        {
          "inputValue": "600",
          "effectiveFrom": "2021-05-15 00:00:00.000",
          "effectiveTo": "2021-05-15 23:59:59.999"
        },
        {
          "inputValue": "700",
          "effectiveFrom": "2021-05-16 00:00:00.000",
          "effectiveTo": "2021-05-16 23:59:59.999"
        }
      ])
    })

    it('should map table values to the input the server wants II', () => {
      var tableInput = {
        'Today -6': '200',
        'Today -5': '300',
        'Today -4': '400',
        'Today -3': '500',
        'Today -2': '600',
        'Today -1': '700',
        'Today': '',
      }
      var now = '2021-05-17 17:00:00.00'
      var result = methods.mapTableInputToRollingCalendarInput({ 
        input: tableInput,
        now,
      })
      expect(result).toEqual([
        {
          "inputValue": '200',
          "effectiveFrom": "2021-05-11 00:00:00.000",
          "effectiveTo": "2021-05-11 23:59:59.999"
        },
        {
          "inputValue": '300',
          "effectiveFrom": "2021-05-12 00:00:00.000",
          "effectiveTo": "2021-05-12 23:59:59.999"
        },
        {
          "inputValue": '400',
          "effectiveFrom": "2021-05-13 00:00:00.000",
          "effectiveTo": "2021-05-13 23:59:59.999"
        },
        {
          "inputValue": '500',
          "effectiveFrom": "2021-05-14 00:00:00.000",
          "effectiveTo": "2021-05-14 23:59:59.999"
        },
        {
          "inputValue": '600',
          "effectiveFrom": "2021-05-15 00:00:00.000",
          "effectiveTo": "2021-05-15 23:59:59.999"
        },
        {
          "inputValue": '700',
          "effectiveFrom": "2021-05-16 00:00:00.000",
          "effectiveTo": "2021-05-16 23:59:59.999"
        },

        {
          "inputValue": '',
          "effectiveFrom": "2021-05-17 00:00:00.000",
          "effectiveTo": "2021-05-17 23:59:59.999"
        }
      ])
    })
  })

  describe('#isLocalDateStr', () => {
    it('should determine it is a local date', () => {
      var testStr = '2021-05-11 23:59:59.99'
      var result = methods.isLocalDateStr(testStr)
      expect(result).toBe(true)
    })
    it('should determine it is a local date with only date part', () => {
      var testStr = '2021-05-11'
      var result = methods.isLocalDateStr(testStr)
      expect(result).toBe(true)
    })
    it('should throw if an invalid date is used', () => {
      var testStr = '2021-05-11 23'
      var run = () => methods.isLocalDateStr(testStr)
      expect(run).toThrow()
    })
    it('should determine it is not a local date', () => {
      var testStr = '2021-05-11 23:59:59.99Z'
      var result = methods.isLocalDateStr(testStr)
      expect(result).toBe(false)
    })
  })

  describe('#formatToLocalDateString', () => {
    it('should format to local date', () => {
      var testDate = new Date('2021-05-11 23:59:59.99')
      var result = methods.formatToLocalDateString(testDate)
      expect(result).toBe('2021-05-11 23:59:59.990')
    })
  })

  describe('#padZero', () => {
    it('should pad a zero', () => {
      var result = methods.padZero(5)
      expect(result).toBe('05')
    })
  })
})