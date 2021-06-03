import * as methods from './util'

describe('RollingCalendar#util', () => {
  describe('#mapRollingCalendarInputToTableInput', () => {
    it('should map rolling calendar data to table data', () => {
      var input = [
        {
          "value": "100",
          "effectiveFrom": "2021-05-10T00:00:00.00",
          "effectiveTo": "2021-05-10T23:59:59.99"
        },
        {
          "value": "200",
          "effectiveFrom": "2021-05-11T00:00:00.00",
          "effectiveTo": "2021-05-11 23:59:59.99"
        },
        {
          "value": "300",
          "effectiveFrom": "2021-05-12T00:00:00.00",
          "effectiveTo": "2021-05-12T23:59:59.99"
        },
        {
          "value": "400",
          "effectiveFrom": "2021-05-13T00:00:00.00",
          "effectiveTo": "2021-05-13T23:59:59.99"
        },
        {
          "value": "500",
          "effectiveFrom": "2021-05-14T00:00:00.00",
          "effectiveTo": "2021-05-14T23:59:59.99"
        },
        {
          "value": "600",
          "effectiveFrom": "2021-05-15T00:00:00.00",
          "effectiveTo": "2021-05-15T23:59:59.99"
        },
        {
          "value": "700",
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
          "value": "100",
          "effectiveFrom": "2021-05-10T00:00:00.00",
          "effectiveTo": "2021-05-10T23:59:59.99"
        },
        {
          "value": "200",
          "effectiveFrom": "2021-05-11T00:00:00.00",
          "effectiveTo": "2021-05-11 23:59:59.99"
        },
        {
          "value": "300",
          "effectiveFrom": "2021-05-12T00:00:00.00",
          "effectiveTo": "2021-05-12T23:59:59.99"
        },
        {
          "value": "400",
          "effectiveFrom": "2021-05-13T00:00:00.00",
          "effectiveTo": "2021-05-13T23:59:59.99"
        },
        {
          "value": "500",
          "effectiveFrom": "2021-05-14T00:00:00.00",
          "effectiveTo": "2021-05-14T23:59:59.99"
        },
        {
          "value": "600",
          "effectiveFrom": "2021-05-15T00:00:00.00",
          "effectiveTo": "2021-05-15T23:59:59.99"
        },
        {
          "value": "700",
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
          "value": "100",
          "effectiveFrom": "2021-05-10 00:00:00.000",
          "effectiveTo": "2021-05-10 23:59:59.999"
        },
        {
          "value": "200",
          "effectiveFrom": "2021-05-11 00:00:00.000",
          "effectiveTo": "2021-05-11 23:59:59.999"
        },
        {
          "value": "300",
          "effectiveFrom": "2021-05-12 00:00:00.000",
          "effectiveTo": "2021-05-12 23:59:59.999"
        },
        {
          "value": "400",
          "effectiveFrom": "2021-05-13 00:00:00.000",
          "effectiveTo": "2021-05-13 23:59:59.999"
        },
        {
          "value": "500",
          "effectiveFrom": "2021-05-14 00:00:00.000",
          "effectiveTo": "2021-05-14 23:59:59.999"
        },
        {
          "value": "600",
          "effectiveFrom": "2021-05-15 00:00:00.000",
          "effectiveTo": "2021-05-15 23:59:59.999"
        },
        {
          "value": "700",
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
          "value": '200',
          "effectiveFrom": "2021-05-11 00:00:00.000",
          "effectiveTo": "2021-05-11 23:59:59.999"
        },
        {
          "value": '300',
          "effectiveFrom": "2021-05-12 00:00:00.000",
          "effectiveTo": "2021-05-12 23:59:59.999"
        },
        {
          "value": '400',
          "effectiveFrom": "2021-05-13 00:00:00.000",
          "effectiveTo": "2021-05-13 23:59:59.999"
        },
        {
          "value": '500',
          "effectiveFrom": "2021-05-14 00:00:00.000",
          "effectiveTo": "2021-05-14 23:59:59.999"
        },
        {
          "value": '600',
          "effectiveFrom": "2021-05-15 00:00:00.000",
          "effectiveTo": "2021-05-15 23:59:59.999"
        },
        {
          "value": '700',
          "effectiveFrom": "2021-05-16 00:00:00.000",
          "effectiveTo": "2021-05-16 23:59:59.999"
        },
        {
          "value": '',
          "effectiveFrom": "2021-05-17 00:00:00.000",
          "effectiveTo": "2021-05-17 23:59:59.999"
        }
      ])
    })
  })

  

  
})