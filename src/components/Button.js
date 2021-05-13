import * as React from 'react'

const Button = props => {
  const { title, onPress } = props
  return <button onClick={onPress}>{title}</button>
}

export default Button
