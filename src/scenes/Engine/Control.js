import * as React from 'react'
import {
  TextInput,
  NumberInput,
  RichTextArea,
  MultilineTextInput,
} from './../../components'
import ConfirmedCasesTable from '../../tables/ConfirmedCasesTable'
import HealthECCDailySnapshotTable from '../../tables/HealthECCDailySnapshotTable'
import StatewideRespiratoryClinicsCapacityTable from './../../tables/StatewideRespiratoryClinicsCapacityTable'
import PersonsTestedTable from '../../tables/PersonsTestedTable'
import ReportVersionInformationTable from '../../tables/ReportVersionInformationTable'
import RespiratoryClinicAppointmentsTable from '../../tables/RespiratoryClinicAppointmentsTable'
import EmergencyDepartmentPresentationsWithILITable from '../../tables/EmergencyDepartmentPresentationsWithILITable'
import AvailableBedsTable from '../../tables/AvailableBedsTable'
import VentilatorCapacityTable from '../../tables/VentilatorCapacityTable'
import VaccinesAdministeredDailyStateGovernmentTable from '../../tables/VaccinesAdministeredDailyStateGovernmentTable'
import VaccinesAdministeredCumulativeStateGovernmentTable from '../../tables/VaccinesAdministeredCumulativeStateGovernmentTable'
import VaccinesAdministeredCumulativeTable from '../../tables/VaccinesAdministeredCumulativeTable'
import CheckInTASApplicationTable from '../../tables/CheckInTASApplicationTable'
import RollingCalendar, { RollingCalendarMulti } from '../../components/RollingCalendar'
import RespiratoryClinicPresentationsTable from '../../tables/RespiratoryClinicPresentationsTable'
import { formatToReadableDateTime } from './../../util/date'

const Control = props => {
  const {
    header,
    text,
    type,
    onChangeValue,
    value,
    id,
    timestamp,
    //receiptStatus,
    //userRole,
    ...controlProps
  } = props

  /*if (controlProps.id == 'Control_DA09325A-FF65-4507-B1B4-4FA36E54B2B0'){
    debugger
  }*/

  switch (type) {
    case 'header-two': return <h2>{text}</h2>
    case 'header-five': return <>
      <h5>
        {text}
        {timestamp ?
          <span class="small timestamp-note">
            {' '}(data last updated at {formatToReadableDateTime(new Date(timestamp))})
          </span> : null}
      </h5>
      <hr class="w-100" />
    </>
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
    case 'Textarea': return <MultilineTextInput
      header={header}
      onChangeText={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'DataLabel': return <p id={id}>
      <span style={{ fontWeight: 'bold' }}>{header}</span>: {value}
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
    case 'VentilatorCapacity': return <VentilatorCapacityTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'VaccinesAdministeredDailyStateGovernment': return <VaccinesAdministeredDailyStateGovernmentTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'VaccinesAdministeredCumulativeStateGovernment': return <VaccinesAdministeredCumulativeStateGovernmentTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'VaccinesAdministeredCumulative': return <VaccinesAdministeredCumulativeTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'CheckInTASApplication': return <CheckInTASApplicationTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'Rolling Calendar': return <RollingCalendar
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'RespiratoryClinicPresentations': return <RespiratoryClinicPresentationsTable
      header={header}
      onChangeValue={onChangeValue}
      value={value}
      id={id}
      {...controlProps}
    />
    case 'RollingCalendarMulti': return <RollingCalendarMulti
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
