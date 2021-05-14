import * as React from 'react'
import classNames from 'classnames'

const TextInput = props => {
  const { 
    header, 
    onChangeText, 
    errorMessage, 
    invalid, 
    multiline,
    maxLength,
    value,
    id,
  } = props

  const Input = props => multiline ? 
    <textarea {...props} /> : 
    <input {...props} />

  return <div 
    className={classNames({
      ['Control']: true,
      ['TextInput']: true,
      ['invalid']: invalid,
    })}
  >
    {header ? <label>{header}</label> : null}
    <Input
      id={id}
      maxLength={maxLength}
      onInput={e => {
        onChangeText(e.target.value)
      }}
      value={value}
    />
    {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
  </div>
}

export default TextInput
