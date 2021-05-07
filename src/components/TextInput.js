import * as React from 'react'
import classNames from 'classnames'

const TextInput = props => {
  const { header, onChangeText, errorMessage } = props
  return <div 
    className={classNames({
      ['Control']: true,
      ['TextInput']: true,
      ['error']: !!errorMessage,
    })}
  >
    {header ? <label>{header}</label> : null}
    <input 
      onInput={e => {
        onChangeText(e.target.value)
      }}
    />
    {/*errorMessage ? <p className="errorMessage">{errorMessage}</p> : null*/}
  </div>
}

export default TextInput
