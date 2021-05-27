import * as React from 'react'
import { EditableTable as Table } from '../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from '../../util/misc'
import controlMap from './controlMap'

const { Fragment, useState, useEffect } = React


const controlsLabelMap = swapKeysWithValues(controlMap)

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const VaccinesAdministeredCumulativeTable = props => {

  const { 
    value: defaultValue, 
    onChangeValue: parentOnChangeValue,
    errorMessage,
  } = props

  const [value, setValue] = useState(defaultValue)
  const onChangeValue = val => {
    setValue(val)
    parentOnChangeValue(val)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <Table 
    value={value} 
    onChangeValue={onChangeValue}
    errorMessage={errorMessage}
    controlMap={controlMap}
  >
    {({ renderCellError, renderCellInput }) => <Fragment>
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
          {renderCellInput('Pfizer Second Doses')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['Pfizer First Doses']])
              + parseIntOrZero(value[controlsLabelMap['Pfizer Second Doses']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('Pfizer First Doses')}
          {renderCellError('Pfizer Second Doses')}
        </tr>
        <tr>
          <td rowSpan={2}>Second doses</td>
          {renderCellInput('AstraZeneca First Doses')}
          {renderCellInput('AstraZeneca Second Doses')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['AstraZeneca First Doses']])
              + parseIntOrZero(value[controlsLabelMap['AstraZeneca Second Doses']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('AstraZeneca First Doses')}
          {renderCellError('AstraZeneca Second Doses')}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default VaccinesAdministeredCumulativeTable
