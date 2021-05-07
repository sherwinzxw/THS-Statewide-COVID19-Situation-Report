import * as React from 'react'
import { 
  TextInput 
} from './../../components'

const Control = props => {
  const { header, text, type, key } = props

  switch(type){
    case 'header-two': return <h2 key={key}>{text}</h2>
    default:
      return <TextInput 
        header={header}
        key={key}
      />
  }
}

export default Control
