import * as React from 'react'
import Control from './Control'
import { 
  combineConfirmedCasesControls,
  combineHealthECCDailySnapshotControls, 
  combineStatewideRespiratoryClinicsCapacityControls,
  combinePersonsTestedControls,
  combineReportVersionInformationControls,
} from './../../util/misc'

const Form = props => {
  var { layout, onChangeValue } = props
  var { layout, onChangeValue } = combineConfirmedCasesControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineHealthECCDailySnapshotControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineStatewideRespiratoryClinicsCapacityControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combinePersonsTestedControls({ layout, onChangeValue })
  var { layout, onChangeValue } = combineReportVersionInformationControls({ layout, onChangeValue })

  return <div className="Form">
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
