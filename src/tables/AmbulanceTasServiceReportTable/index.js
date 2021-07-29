import * as React from 'react'
import { TableHelper } from '../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from '../../util/misc'
import controlMap from './controlMap'

const { useState, useEffect } = React

const controlsLabelMap = swapKeysWithValues(controlMap)

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const AmbulanceTasServiceReportTable = props => {

  const { 
    value: defaultValue, 
    onChangeValue: parentOnChangeValue,
    errorMessage,
    id,
    allControls
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
    allControls={allControls}
  >
    {({ renderCellError, renderCellInput }) => <div className="table-container col-12"><table id={id}>
      <tbody>
        <tr>
          <td rowSpan={2}>EIDS symptoms daily case average</td>
          {renderCellInput('EIDS symptoms daily case average')}
        </tr>
        <tr>
          {renderCellError('EIDS symptoms daily case average')}          
        </tr>
        <tr>
          <td rowSpan={2}>EIDS symptoms case percentage</td>
          {renderCellInput('EIDS symptoms case percentage')}
        </tr>
        <tr>
            {renderCellError('EIDS symptoms case percentage')}
        </tr>
      </tbody>     
    </table></div>}
  </TableHelper>
}

export default AmbulanceTasServiceReportTable
