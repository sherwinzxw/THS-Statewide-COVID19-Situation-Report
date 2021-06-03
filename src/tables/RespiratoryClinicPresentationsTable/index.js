import * as React from 'react'
import { TableHelper as RollingRow } from '../../components'
import controlMap from './controlMap'
import { 
  addDays,
  formatToShortDateMonth as formatDate,
} from './../../util/date'
import {
  swapKeysWithValues,
} from './../../util/misc'

const controlLabelMap = swapKeysWithValues(controlMap)

const RespiratoryClinicPresentations = props => {

  const {
    value,
    errorMessage,
  } = props

  debugger

  const now = new Date()

  return <table>
    <thead>
      <tr>
        <th>Location</th>
        <th>{formatDate(addDays(now, -6))}</th>
        <th>{formatDate(addDays(now, -5))}</th>
        <th>{formatDate(addDays(now, -4))}</th>
        <th>{formatDate(addDays(now, -3))}</th>
        <th>{formatDate(addDays(now, -2))}</th>
        <th>{formatDate(addDays(now, -1))}</th>
        <th>{formatDate(now)}</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {/*<RollingRow 
        value={value[controlLabelMap['Melville Street']]}
        onChangeValue={() => {
        
        }}
      >
        {({ renderCellError, renderCellInput }) => <tr>

        </tr>}
      </RollingRow>*/}
    </tbody>
  </table>
}

export default RespiratoryClinicPresentations
