import * as React from 'react'
import * as apiMethods from './api/api'
import { useModalsContext } from './Modals'

const { createContext, useContext } = React

export const RequestsContext = createContext()
export const useRequestsContext = () => useContext(RequestsContext)

const Requests = props => {
  const { children, showModal, modalContent } = props
  
  const callApi = function(path, options){
    // Make it a little more forgiving if the user accidently adds a leading 
    // slash
    if (path.startsWith('/'))
      path = path.slice(1)
    return fetch(`${API_URL}/${path}`, options)
    .then(response => {

      if (response.status >= 200 && response.status < 300)
        return response.json()

      // If we get an error status code, sometimes we get a response back that
      // isn't JSON
      return response.text()
      .then(responseText => {
        try {
          // We mind not be able to parse this response as JSON
          var responseJson = JSON.parse(responseText)
          var errorMessage = responseJson.message
        } catch {}
        if (!errorMessage)
          errorMessage = response.statusText

        if (response.status == 401){

          showModal(<NotAuthorizedWindow />)
        }

        var error = new Error(errorMessage)
        throw error
      })
      
    })
  }

  var methods = {}
  Object.entries(apiMethods).forEach(([key, func]) => {
    methods[key] = func(callApi)
  })

  return <RequestsContext.Provider 
    value={methods}
  >
    {React.cloneElement(children, { modalContent })}
  </RequestsContext.Provider>
}

export default Requests


const NotAuthorizedWindow = props => {
  return <div className="ModalContent">
    <p className="errorText">Not Authorized</p>
    <a href="http://www.dhhs.tas.gov.au/intranet">Go to login</a>
  </div>
}
