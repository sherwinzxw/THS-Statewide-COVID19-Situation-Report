import * as React from 'react'
import classNames from 'classnames'
import { swapKeysWithValues } from './../util/misc'

const { useRef } = React

/**
 * @typedef EditableTableProps
 * @property {Function} onChangeValue
 * @property {object} controlMap
 * @property {object} errorMessage This is a hash map of control keys to error
 * messages.
 * @property {object} value This is a hash map of control keys to values.
 *
 * @param {EditableTableProps} props
 */
const EditableTable = props => {

  const {
    onChangeValue,
    controlMap,
    errorMessage,
    value: defaultValue,
    children,
    id,
  } = props

  const value = useRef(defaultValue || {}).current

  const cLHash = swapKeysWithValues(controlMap)

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
    value[key] = inputValue
    onChangeValue({ ...value})
  }

  const renderCellInput = (controlLabel, props = {}) => {
    const { cellType, ...otherProps } = props
    var key = cLHash[controlLabel]
    if (!key)
      throw new Error(`Invalid control label '${controlLabel}'.`)

    if (cellType == 'th')
      var cell = <th>{value[key] || ''}</th>
    else
      var cell = <td>{value[key] || ''}</td>

    return React.cloneElement(cell, {
      className: classNames({
        userInput: true,
        userInputWithError: !!errorMessage[key],
      }),
      contentEditable: true,
      onInput: onInput.bind(this, key),
      key,
      rowSpan: errorMessage[key] ? 1 : 2,
      id: key,
      ...otherProps
    })
  }
  
  const renderCellError = (controlLabel, props = {}) => {
    const { cellType, ...otherProps } = props
    var key = cLHash[controlLabel]
    if (!key)
      throw new Error(`Invalid control label '${controlLabel}'.`)
    var msg = errorMessage[key]
    if (!msg) return null
    if (cellType == 'th')
      return <th className="errorMessage" {...props}>{msg}</th>
    return <td className="errorMessage" {...props}>{msg}</td>
  }

  var childProps = {
    renderCellInput,
    renderCellError,
    controlLabelHashmap: cLHash,
  }
  return <table id={id}>
    {children(childProps)}
  </table>
}

export default EditableTable
