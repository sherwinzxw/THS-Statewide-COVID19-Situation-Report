import * as React from 'react'
import Control from './Control'
import { 
  combineConfirmedCasesControls,
  combineHealthECCDailySnapshotControls, 
  combineStatewideRespiratoryClinicsCapacityControls,
  combinePersonsTestedControls,
  combineReportVersionInformationControls,
  combineRespiratoryClinicAppointmentControls,
  combineEmergencyDepartmentPresentationsWithILIControlMap,
  combineAvailableBedsControlMap,
  combineVaccinesAdministeredDailyControlMap,
} from './../../util/controls'

const Form = props => {
  var { layout, onChangeValue } = compose(
    combineConfirmedCasesControls,
    combineHealthECCDailySnapshotControls,
    combineStatewideRespiratoryClinicsCapacityControls,
    combinePersonsTestedControls,
    combineReportVersionInformationControls,
    combineRespiratoryClinicAppointmentControls,
    combineEmergencyDepartmentPresentationsWithILIControlMap,
    combineAvailableBedsControlMap,
    combineVaccinesAdministeredDailyControlMap,
  )(props)

  return <div className="Form" id={props.id}>
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

const compose = (...methods) => props => {
  return methods.reduce((acc, method) => {
    return method(acc)
  }, props)
}