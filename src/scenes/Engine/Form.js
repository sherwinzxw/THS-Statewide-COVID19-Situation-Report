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
} from './../../util/controls'

const Form = props => {
  var { layout, onChangeValue } = props
  var { layout, onChangeValue } = combineConfirmedCasesControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineHealthECCDailySnapshotControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineStatewideRespiratoryClinicsCapacityControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combinePersonsTestedControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineReportVersionInformationControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineRespiratoryClinicAppointmentControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineEmergencyDepartmentPresentationsWithILIControlMap({ layout, onChangeValue })
  
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
