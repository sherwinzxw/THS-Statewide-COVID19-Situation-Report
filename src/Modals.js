import * as React from 'react'
import { Button } from './components'

const { createContext, useContext, useState } = React

export const ModalsContext = createContext()
export const useModalsContext = () => useContext(ModalsContext)

const Modals = props => {
  const { children } = props
  
  const [errors, setErrors] = useState()
  
  return <ModalsContext.Provider 
    value={{
      showErrors: setErrors,
    }}
  >
    {children}
    {errors !== undefined ? <div className="Modal">
      <div className="UIBlock" />
      <ErrorDisplay 
        errors={errors}
        onClose={() => setErrors()}
      />
      
    </div> : null}
  </ModalsContext.Provider>
}

export default Modals

const ErrorDisplay = props => {
  const { errors, onClose } = props
  return <div className="ErrorDisplay">
    {errors.map(err => <p className="errorText">{err.message}</p>)}
    <Button onPress={onClose} title="Close" />
  </div>
}