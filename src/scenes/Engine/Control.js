import * as React from 'react'
import { 
  TextInput,
  NumberInput,
  RichTextArea,
} from './../../components'
import ConfirmedCasesTable from '../../tables/ConfirmedCasesTable'
import HealthECCDailySnapshotTable from '../../tables/HealthECCDailySnapshotTable'
import StatewideRespiratoryClinicsCapacityTable from './../../tables/StatewideRespiratoryClinicsCapacityTable'
import PersonsTestedTable from '../../tables/PersonsTestedTable'
import ReportVersionInformationTable from '../../tables/ReportVersionInformationTable'
import RespiratoryClinicAppointmentsTable from '../../tables/RespiratoryClinicAppointmentsTable'
import EmergencyDepartmentPresentationsWithILITable from '../../tables/EmergencyDepartmentPresentationsWithILITable'
import AvailableBedsTable from '../../tables/AvailableBedsTable'
import VaccinesAdministeredDailyTable from '../../tables/VaccinesAdministeredDailyTable'

const Control = props => {
  const { 
    header, 
    text, 
    type,
    onChangeValue,
    value,
    id,
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
      value={value}
      id={id}
      {...controlProps}
    />
    case 'RichText': return <RichTextArea
      header={header}
      onChangeText={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'Text': return <TextInput 
      header={header}
      onChangeText={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'Textarea': return <TextInput 
      header={header}
      onChangeText={onChangeValue}
      value={value}
      id={id}
      multiline
      {...controlProps}
    />
    case 'DataLabel': return <p id={id}>
      <span style={{fontWeight: 'bold'}}>{header}</span>: {value}
    </p>
    case 'ConfirmedCases': return <ConfirmedCasesTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'HealthECCDailySnapshot': return <HealthECCDailySnapshotTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'StatewideRespiratoryClinicsCapacity': return <StatewideRespiratoryClinicsCapacityTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'PersonsTested': return <PersonsTestedTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'ReportVersionInformation': return <ReportVersionInformationTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />    
    case 'RespiratoryClinicAppointments': return <RespiratoryClinicAppointmentsTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'EmergencyDepartmentPresentationsWithILI': return <EmergencyDepartmentPresentationsWithILITable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'AvailableBeds': return <AvailableBedsTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'VaccinesAdministeredDaily': return <VaccinesAdministeredDailyTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    default:
      return <p>Unknown control type: {type}</p>
  }
}

export default Control
