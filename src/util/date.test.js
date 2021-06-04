import * as methods from './date'

describe('#date', () => {

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

  describe('#getStartOfDay', () => {
    it('should return the start of the day', () => {
      var testDate = new Date(2021, 5, 3, 12, 9)
      var result = methods.getStartOfDay(testDate)
      expect(result.valueOf()).toBe((new Date(2021, 5, 3)).valueOf())
    })
  })

  describe('formatToReadableTime()', () => {
    it('should diplay the correct PM for noon', () => {
      var date = new Date('2018-07-10T12:45:22')

      var result = methods.formatToReadableTime(date)
      expect(result).toBe('12.45PM')
    })

    it('should pad the minutes', () => {
      var date = new Date('2018-07-10T12:05:22')

      var result = methods.formatToReadableTime(date)
      expect(result).toBe('12.05PM')
    })
  })

})