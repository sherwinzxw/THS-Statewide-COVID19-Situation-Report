import * as React from 'react'
import { EditableTable as Table } from './../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from './../../util/misc'
import controlMap from './controlMap'

const { Fragment, useState, useEffect } = React

const controlsLabelMap = swapKeysWithValues(controlMap)

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const EmergencyDepartmentPresentationsWithILITable = props => {

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
          <th>Current resource availability</th>
          <th>RHH</th>
          <th>LGH</th>
          <th>NWRH*</th>
          <th>MCH</th>
          <th>Total</th>
        </tr>
        <tr className="header-two">
          <th rowSpan={2}>THS COVID-19 Escalation Level</th>
          {renderCellInput('RHH THS COVID-19 Escalation Level', { cellType: 'th' })}
          {renderCellInput('LGH THS COVID-19 Escalation Level', { cellType: 'th' })}
          {renderCellInput('NWRH THS COVID-19 Escalation Level', { cellType: 'th' })}
          {renderCellInput('MCH THS COVID-19 Escalation Level', { cellType: 'th' })}
          <th rowSpan={2}></th>
        </tr>
        <tr className="header-two">
          {renderCellError('RHH THS COVID-19 Escalation Level')}
          {renderCellError('LGH THS COVID-19 Escalation Level')}
          {renderCellError('NWRH THS COVID-19 Escalation Level')}
          {renderCellError('MCH THS COVID-19 Escalation Level')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>Presented at ER</td>
          {renderCellInput('RHH Presented at ER')}
          {renderCellInput('LGH Presented at ER')}
          {renderCellInput('NWRH Presented at ER')}
          {renderCellInput('MCH Presented at ER')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH Presented at ER']])
              + parseIntOrZero(value[controlsLabelMap['LGH Presented at ER']])
              + parseIntOrZero(value[controlsLabelMap['NWRH Presented at ER']])
              + parseIntOrZero(value[controlsLabelMap['MCH Presented at ER']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH Presented at ER')}
          {renderCellError('LGH Presented at ER')}
          {renderCellError('NWRH Presented at ER')}
          {renderCellError('MCH Presented at ER')}
        </tr>
        <tr>
          <td rowSpan={2}>Patients admitted that meet self-isolation / quarantine requirements</td>
          {renderCellInput('RHH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellInput('LGH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellInput('NWRH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellInput('MCH Patients admitted that meet self-isolation/quarantine requirements')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH Patients admitted that meet self-isolation/quarantine requirements']])
              + parseIntOrZero(value[controlsLabelMap['LGH Patients admitted that meet self-isolation/quarantine requirements']])
              + parseIntOrZero(value[controlsLabelMap['NWRH Patients admitted that meet self-isolation/quarantine requirements']])
              + parseIntOrZero(value[controlsLabelMap['MCH Patients admitted that meet self-isolation/quarantine requirements']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellError('LGH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellError('NWRH Patients admitted that meet self-isolation/quarantine requirements')}
          {renderCellError('MCH Patients admitted that meet self-isolation/quarantine requirements')}
        </tr>
        <tr>
          <td rowSpan={2}>Patients admitted with suspected COVID-19</td>
          {renderCellInput('RHH Patients admitted with suspected COVID-19')}
          {renderCellInput('LGH Patients admitted with suspected COVID-19')}
          {renderCellInput('NWRH Patients admitted with suspected COVID-19')}
          {renderCellInput('MCH Patients admitted with suspected COVID-19')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH Patients admitted with suspected COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['LGH Patients admitted with suspected COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['NWRH Patients admitted with suspected COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['MCH Patients admitted with suspected COVID-19']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH Patients admitted with suspected COVID-19')}
          {renderCellError('LGH Patients admitted with suspected COVID-19')}
          {renderCellError('NWRH Patients admitted with suspected COVID-19')}
          {renderCellError('MCH Patients admitted with suspected COVID-19')}
        </tr>
        <tr>
          <td rowSpan={2}>Patients admitted with COVID-19</td>
          {renderCellInput('RHH Patients admitted with COVID-19')}
          {renderCellInput('LGH Patients admitted with COVID-19')}
          {renderCellInput('NWRH Patients admitted with COVID-19')}
          {renderCellInput('MCH Patients admitted with COVID-19')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH Patients admitted with COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['LGH Patients admitted with COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['NWRH Patients admitted with COVID-19']])
              + parseIntOrZero(value[controlsLabelMap['MCH Patients admitted with COVID-19']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH Patients admitted with COVID-19')}
          {renderCellError('LGH Patients admitted with COVID-19')}
          {renderCellError('NWRH Patients admitted with COVID-19')}
          {renderCellError('MCH Patients admitted with COVID-19')}
        </tr>
        <tr>
          <td rowSpan={2}>Patients requiring ICU or critical care</td>
          {renderCellInput('RHH Patients requiring ICU or Critical Care')}
          {renderCellInput('LGH Patients requiring ICU or Critical Care')}
          {renderCellInput('NWRH Patients requiring ICU or Critical Care')}
          {renderCellInput('MCH Patients requiring ICU or Critical Care')}
          <td rowSpan={2}>
            {formatNumber(
              parseIntOrZero(value[controlsLabelMap['RHH Patients requiring ICU or Critical Care']])
              + parseIntOrZero(value[controlsLabelMap['LGH Patients requiring ICU or Critical Care']])
              + parseIntOrZero(value[controlsLabelMap['NWRH Patients requiring ICU or Critical Care']])
              + parseIntOrZero(value[controlsLabelMap['MCH Patients requiring ICU or Critical Care']])
            )}
          </td>
        </tr>
        <tr>
          {renderCellError('RHH Patients requiring ICU or Critical Care')}
          {renderCellError('LGH Patients requiring ICU or Critical Care')}
          {renderCellError('NWRH Patients requiring ICU or Critical Care')}
          {renderCellError('MCH Patients requiring ICU or Critical Care')}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default EmergencyDepartmentPresentationsWithILITable
