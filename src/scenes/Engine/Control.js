import * as React from 'react'
import { 
  TextInput,
  NumberInput,
} from './../../components'
import ConfirmedCasesTable from './../ConfirmedCasesTable'
import HealthECCDailySnapshotTable from './../HealthECCDailySnapshotTable'
import StatewideRespiratoryClinicsCapacityTable from './../StatewideRespiratoryClinicsCapacityTable'

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
        {...controlProps}
      />
    case 'RichText': return <TextInput 
      header={header}
      onChangeText={onChangeValue}
      multiline
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
    default:
      return <p>Unknown control type: {type}</p>
  }
}

export default Control
