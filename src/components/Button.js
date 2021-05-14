import * as React from 'react'
import classNames from 'classnames'

const Button = props => {
  const { title, onPress, secondary } = props
  return <button 
    className={classNames({
      'Button': true, 
      'primary': !secondary,
      'secondary': secondary,
    })} 
    onClick={onPress}
  >
   {title}
  </button>
}

export default Button
