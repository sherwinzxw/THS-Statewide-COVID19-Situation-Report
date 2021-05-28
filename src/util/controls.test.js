var methods = require('./controls')

describe('misc', () => {
  
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
})