import * as React from 'react'
import Page from './Page'
import { runOnControl } from './../../util/controls'
import { debounce } from './../../util/misc'
import { useRequestsContext } from './../../Requests'

const { useCallback, useRef, useState } = React

const Engine = props => {
  const { schema, reportId, onError } = props

  var localErrorProps = useRef({}).current
  var localValueProps = useRef({}).current
  // A little hack to force a rerender
  const [rerenderHash, setRerenderHash] = useState('')
  const { putControlValue } = useRequestsContext()


  const doSave = debounce(useCallback(() => {
    Object.entries(localValueProps).filter(([ key, value ]) => {
      return value.synced === false
    })
    .map(([ key, value ]) => {
      value.synced = true
      putControlValue({ 
        value: value.value, 
        controlId: key, 
        reportId,
      })
        .catch(error => {
          console.error(error)
          localErrorProps[key] = 'Unable to save: ' + error.message
          setRerenderHash((Math.random() * 99999).toString(36))
      })
    })
    

    
  }, []), 1000)
  
  const onChangeValue = params => {
    const { value, key } = params
    localValueProps[key] = localValueProps[key] || {}
    // Only fire if the value has changed as onChange may get triggered
    // even if nothing changes
    if (localValueProps[key].value != value){
      localValueProps[key].value = value
      localValueProps[key].synced = false
    }
    doSave()
  }

  var schemaWithValueProps = runOnControl(
    schema, 
    o => {
      if (localValueProps[o.key] !== undefined)
      o.value = localValueProps[o.key].value
      return o
    }
  )

  var schemaWithErrorProps = runOnControl(
    schemaWithValueProps, 
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
