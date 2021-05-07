import * as React from 'react'
import Engine from './scenes/Engine'
import { splitObjectsByKeyValue } from './util/misc'
import { getViews, getControls } from './api/api'
import AppErrorBoundary from './AppErrorBoundary'

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
            type: "header-five",
            key: viewId,
          })
          
          return {
            "type": "form",
            layout,
            key: viewId,
          }
        }
      )

      var schema = {
        "schemaVersion": 5,
        "layout": [
          {
            "type": "page",
            "layout": forms,
            key: 'Page1',
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

  return <AppErrorBoundary>
    {errorMessage ? <p className="ErrorMessage">{errorMessage}</p> : null}
    {schema ? 
      <Engine 
        schema={schema} 
        onError={e => setErrorMessage(e.message)}
      /> : 
      <p>Loading...</p>
    }
  </AppErrorBoundary>
}

export default App
