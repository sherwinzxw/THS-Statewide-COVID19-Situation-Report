import * as React from 'react'
import { TableHelper } from './../../components'

const { useState, useEffect } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_814E1FF9-2A18-4A87-8955-8E2C662707E1': 'No',
  'Control_F45E7518-AEA8-4BFA-A980-F928042ACF24': 'Not Specified',
  'Control_908D45C0-AC85-47F9-852D-2C66BCBB0B04': 'Yes',
}


/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const PersonsTestedTable = props => {

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
    {({ renderCellError, renderCellInput }) => <div className="table-container col-12"><table id={id}>
      <thead>
        <tr className="header-one">
          <th>Symptoms</th>
          <th>No. tested</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>No</td>
          {renderCellInput('No')}
        </tr>
        <tr>
          {renderCellError('No')}
        </tr>
        <tr>
          <td rowSpan={2}>Not Specified</td>
          {renderCellInput('Not Specified')}
        </tr>
        <tr>
          {renderCellError('Not Specified')}
        </tr>
        <tr>
          <td rowSpan={2}>Yes</td>
          {renderCellInput('Yes')}
        </tr>
        <tr>
          {renderCellError('Yes')}
        </tr>
      </tbody>
    </table></div>}
  </TableHelper>
}

export default PersonsTestedTable

