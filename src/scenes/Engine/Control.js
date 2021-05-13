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
    ...controlProps
  } = props


  switch(type){
    case 'header-two': return <h2>{text}</h2>
    case 'header-five': return <><h5>{text}</h5><hr /></>
    case 'Number': return <NumberInput 
        header={header}
        onChange={onChangeValue}
        //{...controlProps}
        errorMessage={controlProps.errorMessage}
      />
    case 'RichText': return <TextInput 
      header={header}
      onChangeText={onChangeValue}
      multiline
      //errorMessage={controlProps.errorMessage}
      {...controlProps}
    />
    case 'DataLabel': return <p>{header}</p>
    default:
      return <TextInput 
        header={header}
        onChangeText={onChangeValue}
        {...controlProps}
      />
  }
}

export default Control
