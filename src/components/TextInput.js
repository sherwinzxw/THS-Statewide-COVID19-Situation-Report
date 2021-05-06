import * as React from 'react'

const TextInput = props => {
  const { header } = props
  return <div className="Control">
    {header ? <label>{header}</label> : null}
    <input 
      className="form-control TextInput"
    />
  </div>
}

export default TextInput
