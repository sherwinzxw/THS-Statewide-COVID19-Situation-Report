import * as React from 'react'
import TableHelper from '../TableHelper'
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
  getStartOfDay,
} from './../../util/date'

const { useRef, useState, Fragment, useEffect } = React


export const RollingCalendarMulti = props => {
  const { 
    onChangeValue: parentOnChangeValue, 
    value: defaultValue, 
    header,
    id,
  } = props

  
  const now = getStartOfDay(new Date()).valueOf()
  const [weekIndex, setWeekIndex] = useState(0)
  const [renderHash, setRenderHash] = useState()
  const valueRef = useRef(defaultValue || {})
  const value = valueRef.current

  const onChangeValue = (controlKey, newValue) => {
    valueRef.current = {
      ...value,
      [controlKey]: newValue,
    }
    parentOnChangeValue(valueRef.current)
  }

  const viewLastWeek = () => setWeekIndex(-1)
  const viewThisWeek = () => setWeekIndex(0)

  return <table id={id}>
    <thead>
      <tr>
        <th style={{textAlign: 'right'}}>
          {weekIndex == 0 ? 
            <button 
              className="RollingCalendarViewWeekButton" 
              onClick={viewLastWeek}
            >
              ⬅️ View previous week
            </button> : 
            <button 
              className="RollingCalendarViewWeekButton" 
              onClick={viewThisWeek}
            >
              ➡️ View current week
            </button>}
          </th>
        <th>
          {formatDate(addDays(now, -6 + (7 * weekIndex)))}
        </th>
        <th>{formatDate(addDays(now, -5 + (7 * weekIndex)))}</th>
        <th>{formatDate(addDays(now, -4 + (7 * weekIndex)))}</th>
        <th>{formatDate(addDays(now, -3 + (7 * weekIndex)))}</th>
        <th>{formatDate(addDays(now, -2 + (7 * weekIndex)))}</th>
        <th>{formatDate(addDays(now, -1 + (7 * weekIndex)))}</th>
        <th>{formatDate(addDays(now, 7 * weekIndex))}</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(value).map(([controlId, value]) => {
        return <RollingRow
          key={controlId + '-' + ((weekIndex == 0) ? "this-week" : "last-week")}
          value={value} 
          onChangeValue={(newValue) => onChangeValue(controlId, newValue)}
          label={header[controlId]}
          dateEnd={(weekIndex == 0) ? undefined : (new Date(addDays(now, - 7))).valueOf()}
        />
      })}
    </tbody>
  </table>
}

export const RollingRow = props => {

  const { 
    value: defaultValue, 
    onChangeValue,
    label,
    dateEnd,
  } = props

  validateRollingCalValue(defaultValue)

  const controlMap = {
    'Day -6': 'Day -6',
    'Day -5': 'Day -5',
    'Day -4': 'Day -4',
    'Day -3': 'Day -3',
    'Day -2': 'Day -2',
    'Day -1': 'Day -1',
    'Day': 'Day',
  }


  var day = dateEnd ? new Date(dateEnd) : new Date()
  var dayStr = formatToLocalDateString(day)

  const onTableChangeValue = tableValues => {
    
    var updatedValues = mapTableInputToRollingCalendarInput({ 
      input: tableValues, 
      dayStr,
    })

    // Replace each item that got updated
    var newArray = valueRef.current.slice(0)
    updatedValues.forEach(dto => {
      var match = newArray.find(dto2 => 
        formatToLocalDateString(new Date(dto.effectiveFrom)) == 
        formatToLocalDateString(new Date(dto2.effectiveFrom)))
      if (!match){
        if (dto.value)
          newArray.push(dto)
      } else {
        match.value = dto.value
      }
    })
    valueRef.current = newArray
    setRenderHash((new Date()).valueOf())
    onChangeValue(valueRef.current)

  }

  const [renderHash, setRenderHash] = useState()
  const valueRef = useRef(defaultValue || [])
  const value = valueRef.current

  const tableValue = mapRollingCalendarInputToTableInput({ input: value, dayStr })

  return <TableHelper
    value={tableValue} 
    onChangeValue={onTableChangeValue}
    errorMessage={{}}
    controlMap={controlMap}
    renderHash={renderHash}
  >
    {({ renderCellError, renderCellInput }) => <Fragment>
      <tr>
        <td rowSpan={2}>{label}</td>
        {renderCellInput('Day -6')}
        {renderCellInput('Day -5')}
        {renderCellInput('Day -4')}
        {renderCellInput('Day -3')}
        {renderCellInput('Day -2')}
        {renderCellInput('Day -1')}
        {renderCellInput('Day')}
        <td rowSpan={2}>
          {formatNumber(
            parseIntOrZero(tableValue['Day -6']) +
            parseIntOrZero(tableValue['Day -5']) +
            parseIntOrZero(tableValue['Day -4']) +
            parseIntOrZero(tableValue['Day -3']) +
            parseIntOrZero(tableValue['Day -2']) +
            parseIntOrZero(tableValue['Day -1']) +
            parseIntOrZero(tableValue['Day'])
          )}
        </td>
      </tr>
      <tr>
        {renderCellError('Day -6')}
        {renderCellError('Day -5')}
        {renderCellError('Day -4')}
        {renderCellError('Day -3')}
        {renderCellError('Day -2')}
        {renderCellError('Day -1')}
        {renderCellError('Day')}
      </tr>
    </Fragment>}
  </TableHelper>
}