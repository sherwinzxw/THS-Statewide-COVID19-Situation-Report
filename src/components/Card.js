import * as React from 'react'

const Card = props => {
  const { title, children } = props
  return <div className="Card">
    <div className="Card-Header">
      <h4>{title}</h4>
    </div>
    <div className="Card-Body">
      {children}
    </div>
  </div>
}

export default Card