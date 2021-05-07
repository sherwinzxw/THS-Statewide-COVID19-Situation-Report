import * as React from 'react'
import { 
  TextInput,
  NumberInput,
} from './../../components'

const Control = props => {
  const { 
    header, 
    text, 
    type, 
    onChangeValue, 
  } = props


  switch(type){
    case 'header-two': return <h2>{text}</h2>
    case 'header-five': return <><h5>{text}</h5><hr /></>
    case 'Number': return <NumberInput 
        header={header}
        onChange={onChangeValue}
      />
    default:
      return <TextInput 
        header={header}
        onChangeText={onChangeValue}
      />
  }
}

export default Control
