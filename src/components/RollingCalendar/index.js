import * as React from 'react'
import Table from '../EditableTable'
import { 
  mapRollingCalendarInputToTableInput,
  mapTableInputToRollingCalendarInput,
  validateRollingCalValue,
} from './util'
import { formatNumber, parseIntOrZero } from '../../util/misc'
import { 
  formatToLocalDateString, 
  addDays,
  formatToShortDateMonth as formatDate,
} from './../../util/date'

const { useRef, useState, Fragment } = React

const RollingCalendar = props => {

  const { 
    onChangeValue, 
    value: defaultValue, 
    id, 
    header,
  } = props

  var now = new Date()
  var nowStr = formatToLocalDateString(now)
  
  validateRollingCalValue(defaultValue)

  const [value, setValue] = useState(defaultValue ?
    mapRollingCalendarInputToTableInput({ input: defaultValue || [], now: nowStr }) :
    {})
  

  const controlMap = {
    'Today -6': 'Today -6',
    'Today -5': 'Today -5',
    'Today -4': 'Today -4',
    'Today -3': 'Today -3',
    'Today -2': 'Today -2',
    'Today -1': 'Today -1',
    'Today': 'Today',
  }

  const onTableChangeValue = values => {
    setValue(values)
    onChangeValue(mapTableInputToRollingCalendarInput({ 
      input: values, 
      now: nowStr,
    }))
  }

  return <Table
    value={value} 
    onChangeValue={onTableChangeValue}
    errorMessage={{}}
    controlMap={controlMap}
    id={id}
  >
  {({ renderCellError, renderCellInput }) => <Fragment>
      <thead>
        <tr>
          <th />
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
        <tr>
          <td rowSpan={2}>{header}</td>
          {renderCellInput('Today -6')}
          {renderCellInput('Today -5')}
          {renderCellInput('Today -4')}
          {renderCellInput('Today -3')}
          {renderCellInput('Today -2')}
          {renderCellInput('Today -1')}
          {renderCellInput('Today')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value['Today -6']) +
              parseIntOrZero(value['Today -5']) +
              parseIntOrZero(value['Today -4']) +
              parseIntOrZero(value['Today -3']) +
              parseIntOrZero(value['Today -2']) +
              parseIntOrZero(value['Today -1']) +
              parseIntOrZero(value['Today'])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('Today -6')}
          {renderCellError('Today -5')}
          {renderCellError('Today -4')}
          {renderCellError('Today -3')}
          {renderCellError('Today -2')}
          {renderCellError('Today -1')}
          {renderCellError('Today')}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default RollingCalendar





