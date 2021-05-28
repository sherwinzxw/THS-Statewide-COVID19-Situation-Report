import * as React from 'react'
import Table from '../EditableTable'
import { 
  mapRollingCalendarInputToTableInput,
  mapTableInputToRollingCalendarInput,
  formatToLocalDateString,
  addDays,
  padZero,
  validateRollingCalValue,
} from './util'

const { useRef, useState, Fragment } = React

const RollingCalendar = props => {

  const { onChangeValue, value } = props

  validateRollingCalValue(value)

  if (value !== undefined && value !== null && value instanceof Array === false)
    throw new Error(`Invalid 'value' (${value}) for Rolling Calendar, expected array or null.`)

  var now = new Date()
  var nowStr = formatToLocalDateString(now)

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
    onChangeValue(mapTableInputToRollingCalendarInput({ 
      input: values, 
      now: nowStr,
    }))
  }

  return <Table
    value={mapRollingCalendarInputToTableInput({ input: value || [], now: nowStr })} 
    onChangeValue={onTableChangeValue}
    errorMessage={{}}
    controlMap={controlMap}
  >
  {({ renderCellError, renderCellInput }) => <Fragment>
      <thead>
        <tr>
          <th>{formatDate(addDays(now, -6))}</th>
          <th>{formatDate(addDays(now, -5))}</th>
          <th>{formatDate(addDays(now, -4))}</th>
          <th>{formatDate(addDays(now, -3))}</th>
          <th>{formatDate(addDays(now, -2))}</th>
          <th>{formatDate(addDays(now, -1))}</th>
          <th>{formatDate(now)}</th>
          <th>Weekly total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {renderCellInput('Today -6')}
          {renderCellInput('Today -5')}
          {renderCellInput('Today -4')}
          {renderCellInput('Today -3')}
          {renderCellInput('Today -2')}
          {renderCellInput('Today -1')}
          {renderCellInput('Today')}
          <td rowSpan={2} />
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


function formatDate(date){
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}`
}


