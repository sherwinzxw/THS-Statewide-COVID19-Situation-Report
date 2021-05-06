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
})