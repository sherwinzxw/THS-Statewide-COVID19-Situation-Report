import * as React from 'react'
import classNames from 'classnames'
import { RECEIPT_STATUS_ENUM } from './../util/controls'

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
    className,
    inputRef,
    receiptStatus,
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
      [className || '']: true,
      ['SubmittedForApproval']: receiptStatus == RECEIPT_STATUS_ENUM.SUBMITTED_FOR_APPROVAL,
      ['Approved']: receiptStatus == RECEIPT_STATUS_ENUM.APPROVED,
      ['SubmittedForAuthorisation']: receiptStatus == RECEIPT_STATUS_ENUM.SUBMITTED_FOR_AUTHORISATION,
      ['Authorised']: receiptStatus == RECEIPT_STATUS_ENUM.AUTHORISED,
    })}
  >
    {header ? <label>{header}</label> : null}
    {multiline ?
      <textarea 
        id={id}
        maxLength={maxLength}
        onInput={e => {
          setValue(e.target.value)
          onChangeText(e.target.value)
        }}
        value={value}
        key={id}
        ref={inputRef}
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
        ref={inputRef}
      />}
    {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
  </div>
}

export default TextInput

