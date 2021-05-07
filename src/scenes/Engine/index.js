import * as React from 'react'
import Page from './Page'
import { debounce } from './../../util/misc'
import { putControlValue } from './../../api/api'

const { useCallback } = React

const Engine = props => {
  const { schema, onError } = props

  const onChangeValue = debounce(useCallback(params => {
    const { value, key } = params
    putControlValue({ value, controlId: key })
    .catch(error => {
      console.error(error)
      onError(error)
    })
  }, []), 1000)

  return <div>
    {schema.layout.map(o => {
      return <Page 
        {...o} 
        onChangeValue={onChangeValue}
        key={o.key}
      />
    })}
    
  </div>
}

export default Engine
