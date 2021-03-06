import * as React from 'react'
import Engine from './scenes/Engine'
import { splitObjectsByKeyValue } from './util/misc'
import AppErrorBoundary from './AppErrorBoundary'
import Modals from './Modals'
import Header from './scenes/Header'
import Requests, { useRequestsContext } from './Requests'
import { runOnControl } from './util/controls'

const { useEffect, useState, Fragment, useRef } = React

const App = props => {
  const { modalContent } = props
  var [schema, setSchema] = useState()
  var [reportId, setReportId] = useState()
  var [errorMessage, setErrorMessage] = useState('')
  var [userRole, setUserRole] = useState()
  const engineRef = useRef()

  const { getViews, getControls, getCurrentUser } = useRequestsContext()

  useEffect(() => {

    ;(async () => {

      /**/
      var [
        controls,
        currentUser, 
      ] = await Promise.all([
        getControls(),
        getCurrentUser(),
      ])
      setUserRole(currentUser.ref_Role)
      setReportId(findReportId(controls))
      var controlsByView = splitObjectsByKeyValue(controls, 'fk_ViewIdentifier')
      const [ views ] = await Promise.all([
        // Grab the views relating to the view ids
        getViews(Object.keys(controlsByView)),
      ])
      var forms = Object.entries(controlsByView).map(
        ([viewId, controls], index) => {
          var layout = controls.map(r => {
            return { 
              key: r.controlIdentifier, 
              type: r.ref_Type, 
              header: r.label, 
              maxLength: r.maxLength,
              value: r.value,
              receiptStatus: r.receiptStatus,
            }
          })
          var view = views.find(v => v && v.viewIdentifier == viewId)
          layout.splice(0, 0, {
            text: view.description || `Form ${index + 1}`,
            type: "header-five",
            key: viewId,
            timestamp: view.timestamp,
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

  return <Fragment>
    {NODE_ENV == 'development' ? <Header /> : null}
    <div className="App">
      {errorMessage ? <p className="ErrorMessage">{errorMessage}</p> : null}
      {schema ? 
        <Engine 
          schema={schema} 
          reportId={reportId}
          onError={e => setErrorMessage(e.message)}
          ref={engineRef}
          userRole={userRole}
        /> : 
        <p>Loading...</p>
      }
    </div>
    {modalContent ? <div className="Modal">
      <div className="UIBlock" />
      {modalContent}
    </div> : null}
  </Fragment>
}

export default _ => <AppErrorBoundary>
  <Modals>
    <Requests>
      <App />
    </Requests>
  </Modals>
</AppErrorBoundary>

const findReportId = controls => {
  var control = controls.find(c => {
    return c.controlIdentifier == 'Control_0C9067D0-A17C-42CE-9496-9A8C5EDF47C7'
  })
  return control ? control.value : null
}
