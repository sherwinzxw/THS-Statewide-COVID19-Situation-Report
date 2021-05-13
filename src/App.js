import * as React from 'react'
import Engine from './scenes/Engine'
import { splitObjectsByKeyValue } from './util/misc'
import { getViews, getControls, getControlValues } from './api/api'
import AppErrorBoundary from './AppErrorBoundary'
import { Button } from './components'

const { useEffect, useState, Fragment } = React

const App = props => {

  var [schema, setSchema] = useState()
  var [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {

    ;(async () => {

      /**/
      var result = await getControls()
      var controlIds = result.map(c => c.controlIdentifier)
      var controlsByView = splitObjectsByKeyValue(result, 'fk_ViewIdentifier')
      
      const [ views, data ] = await Promise.all([
        // Grab the views relating to the view ids
        getViews(Object.keys(controlsByView)),
        //getControlValues(controlIds),
      ])
      var forms = Object.entries(controlsByView).map(
        ([viewId, controls], index) => {
          var layout = controls.map(r => ({ 
            key: r.controlIdentifier, 
            type: r.ref_Type, 
            header: r.label, 
            maxLength: r.maxLength,
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
