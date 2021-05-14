import * as React from 'react'

const Button = props => {
  const { title, onPress } = props
  return <button className="Button primary" onClick={onPress}>{title}</button>
}

export default Button
