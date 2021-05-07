import * as React from 'react'
import Control from './Control'

const Form = props => {
  const { layout, onChangeValue } = props
  return <div className="Form">
    {layout.map(o => <Control 
      {...o} 
      onChangeValue={v => {
        onChangeValue({ value: v, key: o.key })
      }}
      key={o.key}
    />)}
  </div>
}

export default Form
