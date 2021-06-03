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
const VaccinesAdministeredDailyTable = props => {

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
    {({ renderCellError, renderCellInput }) => <table id={id}>
      <thead>
        <tr className="header-one">
          <th></th>
          <th>Pfizer</th>
          <th>AstraZeneca</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>First doses</td>
          {renderCellInput('Pfizer First Doses')}
          {renderCellInput('AstraZeneca First Doses')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['Pfizer First Doses']])
              + parseIntOrZero(value[controlsLabelMap['AstraZeneca First Doses']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('Pfizer First Doses')}
          {renderCellError('AstraZeneca First Doses')}
        </tr>
        <tr>
          <td rowSpan={2}>Second doses</td>
          {renderCellInput('Pfizer Second Doses')}
          {renderCellInput('AstraZeneca Second Doses')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['Pfizer Second Doses']])
              + parseIntOrZero(value[controlsLabelMap['AstraZeneca Second Doses']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('Pfizer Second Doses')}
          {renderCellError('AstraZeneca Second Doses')}
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Cumulative</td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['Pfizer First Doses']])
              + parseIntOrZero(value[controlsLabelMap['Pfizer Second Doses']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['AstraZeneca First Doses']])
              + parseIntOrZero(value[controlsLabelMap['AstraZeneca Second Doses']])
            )}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>}
  </TableHelper>
}

export default VaccinesAdministeredDailyTable
