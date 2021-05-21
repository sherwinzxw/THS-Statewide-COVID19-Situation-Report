import * as React from 'react'
import { 
  TextInput,
  NumberInput,
  RichTextArea,
} from './../../components'
import ConfirmedCasesTable from './../ConfirmedCasesTable'
import HealthECCDailySnapshotTable from './../HealthECCDailySnapshotTable'
import StatewideRespiratoryClinicsCapacityTable from './../StatewideRespiratoryClinicsCapacityTable'
import PersonsTestedTable from '../PersonsTestedTable'

const Control = props => {
  const { 
    header, 
    text, 
    type,
    onChangeValue,
    ...controlProps
  } = props

  /*if (controlProps.id == 'Control_DA09325A-FF65-4507-B1B4-4FA36E54B2B0'){
    debugger
  }*/

  switch(type){
    case 'header-two': return <h2>{text}</h2>
    case 'header-five': return <><h5>{text}</h5><hr /></>
    case 'Number': return <NumberInput 
        header={header}
        onChange={onChangeValue}
        {...controlProps}
      />
    case 'RichText': return <RichTextArea
      header={header}
      onChangeText={onChangeValue}
      {...controlProps}
    />
    case 'Text': return <TextInput 
      header={header}
      onChangeText={onChangeValue}
      {...controlProps}
    />
    case 'DataLabel': return <p>{header}</p>
    case 'ConfirmedCases': return <ConfirmedCasesTable
      header={header}
      onChangeValue={onChangeValue}
      {...controlProps}
    />
    case 'HealthECCDailySnapshot': return <HealthECCDailySnapshotTable
      header={header}
      onChangeValue={onChangeValue}
      {...controlProps}
    />
    case 'StatewideRespiratoryClinicsCapacity': return <StatewideRespiratoryClinicsCapacityTable
      header={header}
      onChangeValue={onChangeValue}
      {...controlProps}
    />
    case 'PersonsTested': return <PersonsTestedTable
      header={header}
      onChangeValue={onChangeValue}
      {...controlProps}
    />
    default:
      return <p>Unknown control type: {type}</p>
  }
}

export default Control
