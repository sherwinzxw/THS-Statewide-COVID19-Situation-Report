import * as React from 'react'
import { Button } from './components'

const { createContext, useContext, useState } = React

export const ModalsContext = createContext()
export const useModalsContext = () => useContext(ModalsContext)

const Modals = props => {
  const { children,  } = props
  
  const [modalContent, setModalContent] = useState(false)
  const showModal = content => {  
    setModalContent(content)

    return {
      close: () => setModalContent(null),
    }
  }

  return <ModalsContext.Provider 
    value={{
      showModal,
    }}
  >
    {React.cloneElement(children, { showModal, modalContent })}
  </ModalsContext.Provider>
}

export default Modals
