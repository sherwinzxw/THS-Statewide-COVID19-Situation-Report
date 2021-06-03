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

      var dayStr = '2021-05-16 16:00:00'

      var result = methods.mapRollingCalendarInputToTableInput({ input, dayStr })
      expect(result).toEqual({
        'Day -6': '100',
        'Day -5': '200',
        'Day -4': '300',
        'Day -3': '400',
        'Day -2': '500',
        'Day -1': '600',
        'Day': '700',
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

      var dayStr = '2021-05-17 16:00:00'

      var result = methods.mapRollingCalendarInputToTableInput({ input, dayStr })
      expect(result).toEqual({
        'Day -6': '200',
        'Day -5': '300',
        'Day -4': '400',
        'Day -3': '500',
        'Day -2': '600',
        'Day -1': '700',
        'Day': '',
      })
    })
  })

  describe('#mapTableInputToRollingCalendarInput', () => {
    it('should map table values to the input the server wants', () => {
      var tableInput = {
        'Day -6': '100',
        'Day -5': '200',
        'Day -4': '300',
        'Day -3': '400',
        'Day -2': '500',
        'Day -1': '600',
        'Day': '700',
      }
      var dayStr = '2021-05-16 17:00:00.00'
      var result = methods.mapTableInputToRollingCalendarInput({ 
        input: tableInput,
        dayStr,
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
        'Day -6': '200',
        'Day -5': '300',
        'Day -4': '400',
        'Day -3': '500',
        'Day -2': '600',
        'Day -1': '700',
        'Day': '',
      }
      var dayStr = '2021-05-17 17:00:00.00'
      var result = methods.mapTableInputToRollingCalendarInput({ 
        input: tableInput,
        dayStr,
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