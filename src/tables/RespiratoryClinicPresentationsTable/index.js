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
      <RollingRow
        label="Ibis Hotel - Guests"
        value={value[controlLabelMap['Ibis Hotel - Guests']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Ibis Hotel - Guests'], newValue)
        }}
      />
      <RollingRow
        label="Ibis Hotel - Staff"
        value={value[controlLabelMap['Ibis Hotel - Staff']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Ibis Hotel - Staff'], newValue)
        }}
      />
      <RollingRow
        label="Macquarie Point"
        value={value[controlLabelMap['Macquarie Point']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Macquarie Point'], newValue)
        }}
      />
      <RollingRow
        label="Best Western Hotel - Guest"
        value={value[controlLabelMap['Best Western Hotel - Guest']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Best Western Hotel - Guest'], newValue)
        }}
      />
      <RollingRow
        label="Best Western Hotel - Staff"
        value={value[controlLabelMap['Best Western Hotel - Staff']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Best Western Hotel - Staff'], newValue)
        }}
      />
      <RollingRow
        label="Hotel Peppers Seaport"
        value={value[controlLabelMap['Hotel Peppers Seaport']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Hotel Peppers Seaport'], newValue)
        }}
      />
      <RollingRow
        label="Travel Lodge - Airport"
        value={value[controlLabelMap['Travel Lodge - Airport']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Travel Lodge - Airport'], newValue)
        }}
      />
      <RollingRow
        label="Travel Lodge - Hobart"
        value={value[controlLabelMap['Travel Lodge - Hobart']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Travel Lodge - Hobart'], newValue)
        }}
      />
      <RollingRow
        label="Wrest Point"
        value={value[controlLabelMap['Wrest Point']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Wrest Point'], newValue)
        }}
      />
      <RollingRow
        label="Sunrise Hotel"
        value={value[controlLabelMap['Sunrise Hotel']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Sunrise Hotel'], newValue)
        }}
      />
      <RollingRow
        label="Hobart Airport"
        value={value[controlLabelMap['Hobart Airport']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Hobart Airport'], newValue)
        }}
      />
      <RollingRow
        label="Hobart Port"
        value={value[controlLabelMap['Hobart Port']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Hobart Port'], newValue)
        }}
      />

      <tr className="light-grey">
        <td>Total Fixed Clinics</td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -6)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -6)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -6)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -6)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -6)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -6)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -6)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -6)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -6)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -6)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -6)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -6)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -6)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -6)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -6)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -5)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -5)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -5)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -5)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -5)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -5)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -5)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -5)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -5)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -5)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -5)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -5)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -5)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -5)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -5)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -4)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -4)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -4)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -4)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -4)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -4)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -4)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -4)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -4)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -4)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -4)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -4)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -4)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -4)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -4)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -3)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -3)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -3)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -3)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -3)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -3)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -3)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -3)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -3)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -3)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -3)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -3)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -3)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -3)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -3)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -2)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -2)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -2)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -2)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -2)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -2)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -2)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -2)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -2)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -2)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -2)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -2)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -2)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -2)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -2)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -1)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -1)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -1)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -1)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -1)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', -1)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', -1)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', -1)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', -1)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', -1)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', -1)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', -1)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', -1)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', -1)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', -1)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', 0)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', 0)) +
            parseIntOrZero(findValueForDayRange('Melville Street', 0)) +
            parseIntOrZero(findValueForDayRange('East Devonport', 0)) + 
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', 0)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Staff', 0)) +
            parseIntOrZero(findValueForDayRange('Macquarie Point', 0)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Guest', 0)) +
            parseIntOrZero(findValueForDayRange('Best Western Hotel - Staff', 0)) +
            parseIntOrZero(findValueForDayRange('Hotel Peppers Seaport', 0)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Airport', 0)) +
            parseIntOrZero(findValueForDayRange('Travel Lodge - Hobart', 0)) +
            parseIntOrZero(findValueForDayRange('Wrest Point', 0)) +
            parseIntOrZero(findValueForDayRange('Sunrise Hotel', 0)) +
            parseIntOrZero(findValueForDayRange('Hobart Airport', 0)) +
            parseIntOrZero(findValueForDayRange('Hobart Port', 0))
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
      {/* <RollingRow
        label="Ibis Hotel"
        value={value[controlLabelMap['Ibis Hotel - Guests']]}
        onChangeValue={(newValue) => {
          onValueItemChange(controlLabelMap['Ibis Hotel - Guests'], newValue)
        }}
      /> */}
      <tr className="light-grey">
        <td>Total Hotel Quarantine</td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', 0))
          )}
        </td>
        <td>
          {([
            'Ibis Hotel - Guests'
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
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -6))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -5)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -5)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -5)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -5)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -5))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -4)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -4)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -4)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -4)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -4))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -3)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -3)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -3)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -3)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -3))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -2)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -2)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -2)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -2)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -2))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', -1)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', -1)) +
            parseIntOrZero(findValueForDayRange('Melville Street', -1)) +
            parseIntOrZero(findValueForDayRange('East Devonport', -1)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', -1))
          )}
        </td>
        <td>
          {formatNumber(
            parseIntOrZero(findValueForDayRange('Portside Burnie', 0)) +
            parseIntOrZero(findValueForDayRange('Wellington St Launceston', 0)) +
            parseIntOrZero(findValueForDayRange('Melville Street', 0)) +
            parseIntOrZero(findValueForDayRange('East Devonport', 0)) +
            parseIntOrZero(findValueForDayRange('Ibis Hotel - Guests', 0))
          )}
        </td>
        <td>
          {([
            'Portside Burnie',
            'Wellington St Launceston',
            'Melville Street',
            'East Devonport',
            'Ibis Hotel - Guests',
            'Ibis Hotel - Staff',
            'Macquarie Point',
            'Best Western Hotel - Guest',
            'Best Western Hotel - Staff',
            'Hotel Peppers Seaport',
            'Travel Lodge - Airport',
            'Travel Lodge - Hobart',
            'Wrest Point',
            'Sunrise Hotel',
            'Hobart Airport',
            'Hobart Port',
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
