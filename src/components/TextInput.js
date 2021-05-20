import * as React from 'react'
import classNames from 'classnames'


const { useState, useEffect } = React

const TextInput = props => {
  const { 
    header, 
    onChangeText, 
    errorMessage, 
    invalid, 
    multiline,
    maxLength,
    value: defaultValue = '',
    id,
  } = props

  var [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <div 
    className={classNames({
      ['Control']: true,
      ['TextInput']: true,
      ['invalid']: invalid,
    })}
  >
    {header ? <label>{header}</label> : null}
    {multiline ?
      <textarea 
        id={id}
        maxLength={maxLength}
        onInput={e => {
          setValue(e.target.value)
          //debugger
          onChangeText(e.target.value)
        }}
        value={value}
        key={id}
      /> :
      <input 
        id={id}
        maxLength={maxLength}
        onInput={e => {
          setValue(e.target.value)
          onChangeText(e.target.value)
        }}
        value={value}
        key={id}
      />}
    {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
  </div>
}

export default TextInput

