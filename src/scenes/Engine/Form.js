import * as React from 'react'
import Control from './Control'
import { combineConfirmedCasesControls } from './../../util/misc'

const Form = props => {
  var { layout, onChangeValue } = props

  layout = combineConfirmedCasesControls({ layout })

  return <div className="Form">
    {layout.map(o => <Control 
      {...o} 
      onChangeValue={v => {
        onChangeValue({ value: v, key: o.key })
      }}
      key={o.key}
      id={o.key}
    />)}
  </div>
}

export default Form
