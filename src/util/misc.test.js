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

  describe('runOnControl()', () => {
    it('should replace all controls with fruit objects', () => {
      var schema = {
        "schemaVersion": 5,
        "layout": [
          {
            "type": "page",
            "layout": [
              {
                "type": "form",
                "layout": [
                  {
                    "type": "unstyled",
                    "key": "g9zzng",
                    "text": ""
                  },
                  {
                    "text": " ",
                    "type": "checkbox",
                    "key": "1vbpa",
                    "header": "Input 1",
                    "placeholder": "qweqwe",
                    "helpText": "qewqweq"
                  },
                ],
                "key": "tycc6n"
              }
            ],
            "key": "uqr76j"
          },
        ]
      }
      const mapFunc = c => ({ fruit: 'Blueberry', key: c.key })
      var result = methods.runOnControl(schema, mapFunc)
      expect(result).toEqual({
        "schemaVersion": 5,
        "layout": [
          {
            "type": "page",
            "layout": [
              {
                "type": "form",
                "layout": [
                  {
                    "fruit": "Blueberry",
                    "key": "g9zzng",
                  },
                  {
                    "fruit": "Blueberry",
                    "key": "1vbpa",
                  },
                ],
                "key": "tycc6n"
              }
            ],
            "key": "uqr76j"
          },
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
})