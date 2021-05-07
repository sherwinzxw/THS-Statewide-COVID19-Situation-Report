import * as React from 'react'
import Engine from './scenes/Engine'
import { splitObjectsByKeyValue } from './util/misc'
import { getViews, getControls } from './api/api'

const { useEffect, useState, Fragment } = React

const App = props => {

  var [schema, setSchema] = useState()
  var [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {

    ;(async () => {

      /**/
      var result = await getControls()

      var controlsByView = splitObjectsByKeyValue(result, 'fk_ViewID')
      
      // Grab the views relating to the view ids
      var views = await getViews(Object.keys(controlsByView))
      var forms = Object.entries(controlsByView).map(
        ([viewId, controls], index) => {
          var layout = controls.map(r => ({ 
            key: r.controlIdentifier, 
            type: r.ref_Type, 
            header: r.label, 
          }))
          var view = views.find(v => v && v.viewIdentifier == viewId)
          layout.splice(0, 0, {
            text: view.description || `Form ${index + 1}`,
            type: "header-two",
            key: viewId,
          })
          
          return {
            "type": "form",
            layout
          }
        }
      )

      var schema = {
        "schemaVersion": 5,
        "layout": [
          {
            "type": "page",
            "layout": forms,
          }
        ]
      }
      setSchema(schema)
    })()
    .catch(error => {
      console.error(error)
      setErrorMessage(error.message)
    })
      
  }, [])

  return <Fragment>
    {errorMessage ? <p className="ErrorMessage">{errorMessage}</p> : null}
    {schema ? <Engine schema={schema} /> : <p>Loading...</p>}
  </Fragment>
}

export default App
