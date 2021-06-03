import * as React from 'react'
import { RollingRow } from '../../components/RollingCalendar'
import controlMap from './controlMap'
import { 
  addDays,
  formatToShortDateMonth as formatDate,
  getStartOfDay,
  getEndOfDay,
} from './../../util/date'
import {
  swapKeysWithValues,
  formatNumber,
  parseIntOrZero,
} from './../../util/misc'

const { useState, useRef } = React

const controlLabelMap = swapKeysWithValues(controlMap)

const RespiratoryClinicPresentations = props => {

  const {
    value: defaultValue,
    errorMessage,
    onChangeValue,
  } = props

  const now = new Date()

  const [renderHash, setRenderHash] = useState()
  const valueRef = useRef(defaultValue)
  const value = valueRef.current
  
  const onValueItemChange = (key, newValue) => {
    valueRef.current = {
      ...value,
      [key]: newValue,
    }
    setRenderHash((new Date()).valueOf())
    onChangeValue(valueRef.current)
  }


  /**
   * Finds the array value item for a specific day.
   */
  const findValueForDayRange = (labelKey, dayIndex) => {
    var record = value[controlLabelMap[labelKey]].find(dto => {
      var lower = (getStartOfDay(addDays(now, dayIndex)))
      var upper = (getStartOfDay(addDays(now, dayIndex + 1)))
      return (new Date(dto.effectiveFrom) >= lower)
        && (new Date(dto.effectiveFrom) < upper)
    })
    if (record)
      return record.value
    return null
  }

  return <table renderHash={renderHash} className="RespiratoryClinicPresentationsTable">
    <thead>
      <tr className="blue">
        <th>Location</th>
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
      <RollingRow 
        label="Melville Street"
        value={value[controlLabelMap['Melville Street']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Melville Street'], newValue)
        }}
      />
      <RollingRow 
        label="East Devonport"
        value={value[controlLabelMap['East Devonport']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['East Devonport'], newValue)
        }}
      />
      <RollingRow 
        label="Portside Burnie"
        value={value[controlLabelMap['Portside Burnie']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Portside Burnie'], newValue)
        }}
      />
      <RollingRow 
        label="Wellington St Launceston"
        value={value[controlLabelMap['Wellington St Launceston']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Wellington St Launceston'], newValue)
        }}
      />
      <tr className="light-grey">
        <td>Total Fixed Clinics</td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -6)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -6)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -6)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -5)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -5)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -5)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -4)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -4)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -4)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -3)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -3)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -3)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -2)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -2)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -2)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -1)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -1)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -1)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', 0)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', 0)) +
            parseIntOrZero(findValueForDayRange('Melville Street', 0)) +
            parseIntOrZero(findValueForDayRange('East Devonport', 0))
          )}
        </td>
        <td>
          {([
            'Portside Burnie',
            'Wellington St Launceston',
            'Melville Street',
            'East Devonport'
          ]).reduce((cur, label) => {
            return cur + Object.values(value[controlLabelMap[label]]).reduce((prev, val) => {
              return prev + parseIntOrZero(val.value)
            }, 0)
          }, 0)}
        </td>
      </tr>
      <RollingRow 
        label="Ibis Hotel"
        value={value[controlLabelMap['Ibis Hotel']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Ibis Hotel'], newValue)
        }}
      />
      <tr className="light-grey">
        <td>Total Hotel Quarantine</td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel', 0))
          )}
        </td>
        <td>
          {([
            'Ibis Hotel'
          ]).reduce((cur, label) => {
            return cur + Object.values(value[controlLabelMap[label]]).reduce((prev, val) => {
              return prev + parseIntOrZero(val.value)
            }, 0)
          }, 0)}
        </td>
      </tr>
      <tr className="grey">
        <td>Grand Total</td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -6)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -6)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -6)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -6)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -5)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -5)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -5)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -5)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -4)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -4)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -4)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -4)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -3)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -3)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -3)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -3)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -2)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -2)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -2)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -2)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -1)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -1)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -1)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -1)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', 0)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', 0)) +
            parseIntOrZero(findValueForDayRange('Melville Street', 0)) +
            parseIntOrZero(findValueForDayRange('East Devonport', 0)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel', 0))
          )}
        </td>
        <td>
          {([
            'Portside Burnie',
            'Wellington St Launceston',
            'Melville Street',
            'East Devonport',
            'Ibis Hotel'
          ]).reduce((cur, label) => {
            return cur + Object.values(value[controlLabelMap[label]]).reduce((prev, val) => {
              return prev + parseIntOrZero(val.value)
            }, 0)
          }, 0)}
        </td>
      </tr>
    </tbody>
  </table>
}

export default RespiratoryClinicPresentations
