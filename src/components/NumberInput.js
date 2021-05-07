import * as React from 'react'
import TextInput from './TextInput'

const { useState } = React

const NumberInput = props => {

  const { 
    onChange, 
    errorMessage, 
  } = props

  const [validationMessage, setValidationMessage] = useState('')

  const onChangeText = str => {
    setValidationMessage('')
    var value = Number(str)
    if (Number.isNaN(value)){
      setValidationMessage('Invalid.')
    }
    onChange(value)
  }

  return <TextInput
    {...props}
    onChangeText={onChangeText}
    errorMessage={validationMessage || errorMessage}
    invalid={!!validationMessage}
  />
}

export default NumberInput
