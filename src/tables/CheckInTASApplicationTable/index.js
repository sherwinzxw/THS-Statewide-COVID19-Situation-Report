import * as React from 'react'
import { TableHelper } from '../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from '../../util/misc'
import controlMap from './controlMap'

const { Fragment, useState, useEffect } = React


const controlsLabelMap = swapKeysWithValues(controlMap)

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const CheckInTASApplicationTable = props => {

  const {
    value: defaultValue,
    onChangeValue: parentOnChangeValue,
    errorMessage,
    id,
  } = props

  const [value, setValue] = useState(defaultValue)
  const onChangeValue = val => {
    setValue(val)
    parentOnChangeValue(val)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <TableHelper
    value={value}
    onChangeValue={onChangeValue}
    errorMessage={errorMessage}
    controlMap={controlMap}
  >
    {({ renderCellError, renderCellInput }) => <div className="table-container col-12">
      <table id={id}>
        <tbody>
          <tr>
            <td rowSpan={2}>Total number of registered venues</td>
            {renderCellInput('Total number of registered venues')}
          </tr>
          <tr>
            {renderCellError('Total number of registered venues')}
          </tr>
          <tr>
            <td rowSpan={2}>Pending venue registrations</td>
            {renderCellInput('Pending venue registrations')}
          </tr>
          <tr>
            {renderCellError('Pending venue registrations')}
          </tr>
          <tr>
            <td rowSpan={2}>Welcome pack sent in the past week</td>
            {renderCellInput('Welcome pack sent in the past week')}
          </tr>
          <tr>
            {renderCellError('Welcome pack sent in the past week')}
          </tr>
        </tbody>
      </table></div>}
  </TableHelper>
}

export default CheckInTASApplicationTable
