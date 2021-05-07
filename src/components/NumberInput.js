import * as React from 'react'
import TextInput from './TextInput'

const { useState } = React

const NumberInput = props => {

  const { onChange } = props

  const [errorMessage, setErrorMessage] = useState('')

  const onChangeText = str => {
    var value = Number(str)
    if (Number.isNaN(value)){
      setErrorMessage('Invalid.')
    }
    onChange(value)
  }

  return <TextInput
    {...props}
    onChangeText={onChangeText}
    errorMessage={errorMessage}
  />
}

export default NumberInput
