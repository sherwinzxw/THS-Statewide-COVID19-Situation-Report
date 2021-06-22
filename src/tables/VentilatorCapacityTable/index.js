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
const VentilatorCapacityTable = props => {

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
    {({ renderCellError, renderCellInput }) => <div className="table-container col-12"><table id={id}>
      <thead>
        <tr className="header-one">
          <th>Current Ventilators</th>
          <th>RHH</th>
          <th>LGH</th>
          <th>NWRH</th>
          <th>MCH</th>
          <th>AT</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>Category 1</td>
          {renderCellInput('RHH - Category 1')}
          {renderCellInput('LGH - Category 1')}
          {renderCellInput('NWRH - Category 1')}
          {renderCellInput('MCH - Category 1')}
          {renderCellInput('Ambulance Tasmania - Category 1')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['LGH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['NWRH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['MCH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['Ambulance Tasmania - Category 1']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH - Category 1')}
          {renderCellError('LGH - Category 1')}
          {renderCellError('NWRH - Category 1')}
          {renderCellError('MCH - Category 1')}
          {renderCellError('Ambulance Tasmania - Category 1')}
        </tr>
        <tr>
          <td rowSpan={2}>Category 2</td>
          {renderCellInput('RHH - Category 2')}
          {renderCellInput('LGH - Category 2')}
          {renderCellInput('NWRH - Category 2')}
          {renderCellInput('MCH - Category 2')}
          {renderCellInput('Ambulance Tasmania - Category 2')}
          <td rowSpan={2}>
          {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH - Category 2']])
              + parseIntOrZero(value[controlsLabelMap['LGH - Category 2']])
              + parseIntOrZero(value[controlsLabelMap['NWRH - Category 2']])
              + parseIntOrZero(value[controlsLabelMap['MCH - Category 2']])
              + parseIntOrZero(value[controlsLabelMap['Ambulance Tasmania - Category 2']])
            )}
          </td>
        </tr>
        <tr>
            {renderCellError('RHH - Category 2')}
            {renderCellError('LGH - Category 2')}
            {renderCellError('NWRH - Category 2')}
            {renderCellError('MCH - Category 2')}
            {renderCellError('Ambulance Tasmania - Category 2')}
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['RHH - Category 2']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['LGH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['LGH - Category 2']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['NWRH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['NWRH - Category 2']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['MCH - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['MCH - Category 2']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['Ambulance Tasmania - Category 1']])
              + parseIntOrZero(value[controlsLabelMap['Ambulance Tasmania - Category 2']])
            )}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table></div>}
  </TableHelper>
}

export default VentilatorCapacityTable
