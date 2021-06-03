import * as React from 'react'
import { TableHelper } from './../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from './../../util/misc'
import controlMap from './controlMap'

const { Fragment, useState, useEffect } = React


const controlsLabelMap = swapKeysWithValues(controlMap)



/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const ConfirmedCasesTable = props => {

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
          <th colSpan={3}>New cases in the last week</th>
          <th>Total confirmed cases</th>
          <th colSpan={4}>Cumulative since 2 March 2020 *</th>
        </tr>
        <tr className="header-two">
          <th></th>
          <th>Positive cases confirmed</th>
          <th>Deaths in last week</th>
          <th>Total confirmed cases</th>
          <th>Total deaths</th>
          <th>Total people recovered</th>
          <th>Total active cases</th>
          <th>Total tests conducted</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>South</td>
          {renderCellInput('South - Posivite cases confirmed')}
          {renderCellInput('South - Deaths in last week')}
          {renderCellInput('South - Total confirmed cases')}
          {renderCellInput('South - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('South - Posivite cases confirmed')}
          {renderCellError('South - Deaths in last week')}
          {renderCellError('South - Total confirmed cases')}
          {renderCellError('South - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>North</td>
          {renderCellInput('North - Posivite cases confirmed')}
          {renderCellInput('North - Deaths in last week')}
          {renderCellInput('North - Total confirmed cases')}
          {renderCellInput('North - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('North - Posivite cases confirmed')}
          {renderCellError('North - Deaths in last week')}
          {renderCellError('North - Total confirmed cases')}
          {renderCellError('North - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>North West</td>
          {renderCellInput('North West - Posivite cases confirmed')}
          {renderCellInput('North West - Deaths in last week')}
          {renderCellInput('North West - Total confirmed cases')}
          {renderCellInput('North West - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('North West - Posivite cases confirmed')}
          {renderCellError('North West - Deaths in last week')}
          {renderCellError('North West - Total confirmed cases')}
          {renderCellError('North West - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>Interstate</td>
          {renderCellInput('Interstate - Posivite cases confirmed')}
          {renderCellInput('Interstate - Deaths in last week')}
          {renderCellInput('Interstate - Total confirmed cases')}
          {renderCellInput('Interstate - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('Interstate - Posivite cases confirmed')}
          {renderCellError('Interstate - Deaths in last week')}
          {renderCellError('Interstate - Total confirmed cases')}
          {renderCellError('Interstate - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>Not Reported</td>
          {renderCellInput('Not Reported - Posivite cases confirmed')}
          {renderCellInput('Not Reported - Deaths in last week')}
          {renderCellInput('Not Reported - Total confirmed cases')}
          {renderCellInput('Not Reported - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('Not Reported - Posivite cases confirmed')}
          {renderCellError('Not Reported - Deaths in last week')}
          {renderCellError('Not Reported - Total confirmed cases')}
          {renderCellError('Not Reported - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Posivite cases confirmed']])
              + parseIntOrZero(value[controlsLabelMap['North - Posivite cases confirmed']])
              + parseIntOrZero(value[controlsLabelMap['North West - Posivite cases confirmed']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Posivite cases confirmed']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Posivite cases confirmed']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Deaths in last week']])
              + parseIntOrZero(value[controlsLabelMap['North - Deaths in last week']])
              + parseIntOrZero(value[controlsLabelMap['North West - Deaths in last week']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Deaths in last week']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Deaths in last week']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Total confirmed cases']])
              + parseIntOrZero(value[controlsLabelMap['North - Total confirmed cases']])
              + parseIntOrZero(value[controlsLabelMap['North West - Total confirmed cases']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Total confirmed cases']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Total confirmed cases']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Total deaths - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North - Total deaths - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North West - Total deaths - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Total deaths - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Total deaths - Cumulative since 2 March 2020*']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Total people recovered - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North - Total people recovered - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North West - Total people recovered - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Total people recovered - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Total people recovered - Cumulative since 2 March 2020*']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Total active cases  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North - Total active cases  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North West - Total active cases  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Total active cases  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Total active cases  - Cumulative since 2 March 2020*']])
            )}
          </td>
          <td>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['South - Total tests conducted  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North - Total tests conducted  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['North West - Total tests conducted  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Interstate - Total tests conducted  - Cumulative since 2 March 2020*']])
              + parseIntOrZero(value[controlsLabelMap['Not Reported - Total tests conducted  - Cumulative since 2 March 2020*']])
            )}
          </td>
        </tr>
      </tfoot>
    </table>}
  </TableHelper>
}

export default ConfirmedCasesTable
