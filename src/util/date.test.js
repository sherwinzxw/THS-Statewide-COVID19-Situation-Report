import * as methods from './util'

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
  
})