import * as React from 'react'
import Page from './Page'
import { debounce, runOnControl } from './../../util/misc'
import { putControlValue } from './../../api/api'

const { useCallback, useRef, useState } = React

const Engine = props => {
  const { schema, onError } = props

  var localErrorProps = useRef({}).current
  // A little hack to force a rerender
  const [rerenderHash, setRerenderHash] = useState('')


  const onChangeValue = debounce(useCallback(params => {
    const { value, key } = params
    putControlValue({ value, controlId: key })
    .catch(error => {
      console.error(error)
      localErrorProps[key] = 'Unable to save: ' + error.message
      setRerenderHash((Math.random() * 99999).toString(36))
      
    })
  }, []), 1000)

  var schemaWithErrorProps = runOnControl(
    schema, 
    o => {
      o.errorMessage = localErrorProps[o.key]
      return o
    }
  )

  return <div hash={rerenderHash}>
    {schemaWithErrorProps.layout.map(o => {
      return <Page 
        {...o}
        onChangeValue={onChangeValue}
        key={o.key}
      />
    })}
    
  </div>
}

export default Engine
