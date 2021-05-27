import * as React from 'react'
import { EditableTable as Table } from '../../components'
import { swapKeysWithValues, formatNumber, parseIntOrZero } from './../../util/misc'
import controlMap from './controlMap'

const { Fragment, useState, useEffect } = React

const controlsLabelMap = swapKeysWithValues(controlMap)

const hospitalCodes = ['RHH', 'LGH', 'NWRH', 'MCH']

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const AvailableBedsTable = props => {

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

  const onInput = (key, e) => {
    // By doing this we allow the user to enter anything into the editable
    // html element and the browser will do the formatting to handle the paste
    // but this extracts only the text content and replaces the input with
    // only that.
    var inputValue = e.target.innerText
    e.target.innerText = inputValue

    // This will remove the cursor to the end of the pasted content
    var range = document.createRange()
    range.selectNodeContents(e.target)
    range.collapse(false)
    var selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)

    onChangeValue({
      ...value,
      [key]: inputValue,
    })

  }

  const renderEditSpan = (label) => {
    return <span 
      className="editableSpan"
      contentEditable
      onInput={onInput.bind(this, controlsLabelMap[label])}
    >
      {value[controlsLabelMap[label]] || ''}
    </span>
  }

  const renderErrors = (...labels) => {
    var errors = labels.map(l => errorMessage[controlsLabelMap[l]]).filter(e => e)
    if (errors.length == 0) return null
    return <div>
      {errors.map(err => <span className="cellErrorMessage">{err}</span>)}
    </div>
  }

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
          <th>ICU routine capacity</th>
          <th>ICU extended capacity</th>
          <th>Ventilators</th>
          <th>Negative pressure rooms</th>
          <th>Negative flow rooms</th>
          <th>COVID-19 Isolation beds</th>
        </tr>
      </thead>
      <tbody>
        {hospitalCodes.map(hospitalCode => <Fragment>
          <tr>
            <td rowSpan={2}>{hospitalCode}</td>
            <td rowSpan={2}>
              <div>
                {renderEditSpan(`${hospitalCode} ICU routine capacity - being used`)}
                <span> / </span>
                {renderEditSpan(`${hospitalCode} ICU routine capacity`)}
              </div>
              {renderErrors(
                `${hospitalCode} ICU routine capacity - being used`,
                `${hospitalCode} ICU routine capacity`,
              )}
            </td>
            {renderCellInput(`${hospitalCode} ICU extended capacity`)}
            <td rowSpan={2}>
              <div>
                {renderEditSpan(`${hospitalCode} Ventilators - being used`)}
                <span> / </span>
                {renderEditSpan(`${hospitalCode} Ventilators`)}
              </div>
              {renderErrors(
                `${hospitalCode} Ventilators - being used`,
                `${hospitalCode} Ventilators`,
              )}
            </td>
            <td rowSpan={2}>
              <div>
                {renderEditSpan(`${hospitalCode} Negative pressure rooms - being occupied`)}
                <span> / </span>
                {renderEditSpan(`${hospitalCode} Negative pressure rooms - capacity`)}
              </div>
              {renderErrors(
                `${hospitalCode} Negative pressure rooms - being occupied`,
                `${hospitalCode} Negative pressure rooms - capacity`,
              )}
            </td>
            <td rowSpan={2}>
              <div>
                {renderEditSpan(`${hospitalCode} Negative flow rooms - being occupied`)}
                <span> / </span>
                {renderEditSpan(`${hospitalCode} Negative flow rooms - capacity`)}
              </div>
              {renderErrors(
                `${hospitalCode} Negative flow rooms - being occupied`,
                `${hospitalCode} Negative flow rooms - capacity`,
              )}
            </td>
            <td rowSpan={2}>
              <div>
                {renderEditSpan(`${hospitalCode} COVID-19 Isolation beds - being used`)}
                <span> / </span>
                {renderEditSpan(`${hospitalCode} COVID-19 Isolation beds - capacity`)}
              </div>
              {renderErrors(
                `${hospitalCode} COVID-19 Isolation beds - being used`,
                `${hospitalCode} COVID-19 Isolation beds - capacity`,
              )}
            </td>
          </tr>
          <tr>
            {renderCellError(`${hospitalCode} ICU extended capacity`)}
          </tr>
        </Fragment>)}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td rowSpan={2}>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} ICU routine capacity - being used`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
            <span> / </span>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} ICU routine capacity`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
          </td>
          <td>
            {formatNumber(
              hospitalCodes
                .map(code => value[controlsLabelMap[`${code} ICU extended capacity`]])
                .reduce((acc, val) => acc + parseIntOrZero(val), 0)
            )}
          </td>
          <td rowSpan={2}>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Ventilators - being used`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
            <span> / </span>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Ventilators`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
          </td>
          <td rowSpan={2}>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Negative pressure rooms - being occupied`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
            <span> / </span>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Negative pressure rooms - capacity`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
          </td>
          <td rowSpan={2}>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Negative flow rooms - being occupied`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
            <span> / </span>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} Negative flow rooms - capacity`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
          </td>
          <td rowSpan={2}>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} COVID-19 Isolation beds - being used`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
            <span> / </span>
            <span>
              {formatNumber(
                hospitalCodes
                  .map(code => value[controlsLabelMap[`${code} COVID-19 Isolation beds - capacity`]])
                  .reduce((acc, val) => acc + parseIntOrZero(val), 0)
              )}
            </span>
          </td>
        </tr>
      </tfoot>
    </Fragment>}
  </Table>
}

export default AvailableBedsTable
