import * as React from 'react'
import Page from './Page'

const Engine = props => {
  const { schema } = props

  return <div>
    {schema.layout.map(o => {
      return <Page {...o} />
    })}
    
  </div>
}

export default Engine
