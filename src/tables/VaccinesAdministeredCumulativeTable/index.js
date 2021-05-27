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
          <th>Provider / setting</th>
          <th>Vaccines administered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>State Government*</td>
          {renderCellInput('State Government')}
        </tr>
        <tr>
          {renderCellError('State Government')}
        </tr>
        <tr>
          <td rowSpan={2}>Aged Care**</td>
          {renderCellInput('Aged Care')}
        </tr>
        <tr>
          {renderCellError('Aged Care')}
        </tr>
        <tr>
          <td rowSpan={2}>Primary Care**</td>
          {renderCellInput('Primary Care')}
        </tr>
        <tr>
          {renderCellError('Primary Care')}
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['State Government']])
              + parseIntOrZero(value[controlsLabelMap['Aged Care']])
              + parseIntOrZero(value[controlsLabelMap['Primary Care']])
            )}
          </td>
        </tr>
      </tfoot>
    </Fragment>}
  </Table>
}

export default VaccinesAdministeredCumulativeTable
