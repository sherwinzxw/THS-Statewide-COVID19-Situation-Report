import * as React from 'react'
import Control from './Control'

const Form = props => {
  const { layout } = props
  return <div className="Form">
    {layout.map(o => <Control {...o} />)}
  </div>
}

export default Form
