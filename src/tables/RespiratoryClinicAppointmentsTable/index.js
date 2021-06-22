import * as React from 'react'
import { TableHelper } from './../../components'

const { useState, useEffect } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_3FD4CD18-44EB-4308-990A-2363BDA0DA91': 'Melville Street',
  'Control_c2faaba1-da7a-4bdb-9a01-af7a851529df': 'East Devonport',
  'Control_AAD8C6A2-8293-4029-A950-DD0059FCFC8A': 'Wellington Street',
  'Control_791990BA-87EB-4B49-B1A1-606BE374A7F4': 'Macquarie Point',
  'Control_2EA57D42-F8F6-4B9E-A5A9-F0914BB7F11A': 'Portside Burnie',

}


/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const RespiratoryClinicAppointmentsTable = props => {

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
          <th>Location</th>
          <th>Booked</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>Melville Street</td>
          {renderCellInput(
            'Melville Street',
            { contentEditable: true, },
          )}
        </tr>
        <tr>
          {renderCellError(
            'Melville Street',
          )}
        </tr>
        <tr>
          <td rowSpan={2}>Wellington Street</td>
          {renderCellInput(
            'Wellington Street',
            { contentEditable: true, },
          )}
        </tr>
        <tr>
          {renderCellError(
            'Wellington Street',
          )}
        </tr>
        <tr>
          <td rowSpan={2}>East Devonport</td>
          {renderCellInput(
            'East Devonport',
            { contentEditable: true, },
          )}
        </tr>
        <tr>
          {renderCellError(
            'East Devonport',
          )}
        </tr>
        <tr>
          <td rowSpan={2}>East Devonport</td>
          {renderCellInput(
            'Macquarie Point',
            { contentEditable: true, },
          )}
        </tr>
        <tr>
          {renderCellError(
            'Macquarie Point',
          )}
        </tr>
        <tr>
          <td rowSpan={2}>East Devonport</td>
          {renderCellInput(
            'Port Burnie',
            { contentEditable: true, },
          )}
        </tr>
        <tr>
          {renderCellError(
            'Port Burnie',
          )}
        </tr>
      </tbody>
    </table></div>}
  </TableHelper>
}

export default RespiratoryClinicAppointmentsTable
