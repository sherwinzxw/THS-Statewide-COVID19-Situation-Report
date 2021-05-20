import * as React from 'react'
import { swapKeysWithValues } from './../util/misc'

const EditableTable = props => {

  const {
    onChangeValue,
    controlMap,
    errorMessage,
    value,
    children,
  } = props

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

    onChangeValue({
      ...value,
      [key]: inputValue,
    })

  }

  const renderCellInput = (controlLabel, props) => {
    var key = cLHash[controlLabel]
    if (!key)
      throw new Error(`Invalid control label '${controlLabel}'.`)
    return <td 
      className="userInput" 
      contentEditable
      onInput={onInput.bind(this, key)}
      key={key}
      //rowSpan={errorMessage[key] ? 1 : 2}
      {...props}
    >
      {value[key] || ''}
    </td>
  }

  const renderCellError = (controlLabel, props) => {
    var key = cLHash[controlLabel]
    if (!key)
      throw new Error(`Invalid control label '${controlLabel}'.`)
    var msg = errorMessage[key]
    return <td className="errorMessage" {...props}>{msg}</td>
  }

  var childProps = {
    renderCellInput,
    renderCellError,
  }
  return <table>
    {children(childProps)}
  </table>
}

export default EditableTable
