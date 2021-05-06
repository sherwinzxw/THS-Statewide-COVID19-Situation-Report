import * as React from 'react'
import { 
  TextInput 
} from './../../components'

const Engine = props => {
  const { schema } = props

  return <div>
    {schema.layout[0].layout[0].layout.map(control => {
      const { header, type } = control
      return <TextInput 
        header={header}
      />
    })}
  </div>
}

export default Engine
