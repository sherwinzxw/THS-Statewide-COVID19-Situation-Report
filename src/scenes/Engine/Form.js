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
  combineVaccinesAdministeredDailyStateGovernmentControlMap,
  combineVaccinesAdministeredCumulativeStateGovernmentControlMap,
  combineVaccinesAdministeredCumulativeControlMap,
  combineCheckInTASApplicationControlMap,
  combineRespiratoryClinicPresentationsControlMap,
  combineRollingCalendarControls,
} from './../../util/controls'

const Form = props => {
  var { layout, onChangeValue, userRole } = compose(
    combineConfirmedCasesControls,
    combineHealthECCDailySnapshotControls,
    combineStatewideRespiratoryClinicsCapacityControls,
    combinePersonsTestedControls,
    combineReportVersionInformationControls,
    combineRespiratoryClinicAppointmentControls,
    combineEmergencyDepartmentPresentationsWithILIControlMap,
    combineAvailableBedsControlMap,
    combineVaccinesAdministeredDailyStateGovernmentControlMap,
    combineVaccinesAdministeredCumulativeStateGovernmentControlMap,
    combineVaccinesAdministeredCumulativeControlMap,
    combineCheckInTASApplicationControlMap,
    combineRespiratoryClinicPresentationsControlMap,
    combineRollingCalendarControls,
  )(props)

  return <div className="Form mb-5" id={props.id}>
    {layout.map(o => <div className="row">
      <Control 
        {...o} 
        onChangeValue={v => {
          onChangeValue({ value: v, key: o.key })
        }}
        key={o.key}
        id={o.key}
        userRole={userRole}
      />
    </div>)}
  </div>
}

export default Form

const compose = (...methods) => props => {
  return methods.reduce((acc, method) => {
    return method(acc)
  }, props)
}