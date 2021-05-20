import * as React from 'react'
import { EditableTable as Table } from './../../components'

const { Fragment, useState, useEffect } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_8CCA5C67-5BCE-4349-9D43-97A6309A09CF': 'South - Melville Street Clinic - Operating Hours',
  'Control_006A8C2E-7997-4318-800D-4E0D3FD87DBB': 'North - Wellington Clinic - Operating Hours',
  'Control_BA7C9976-C6E7-432B-A125-2393C9684CB5': 'North West - Portside drive-through - Operating Hours',
  'Control_051FF693-67E7-42AA-BC71-16FE126CEE50': 'North West - East Devonport drive-through - Operating Hours',
}


/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const StatewideRespiratoryClinicsCapacityTable = props => {

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
          <th>Location</th>
          <th>Clinic</th>
          <th>Operating Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>South</td>
          <td>Melville Street</td>
          {renderCellInput(
            'South - Melville Street Clinic - Operating Hours',
            { contentEditable: false, rowSpan: 1 },
          )}
        </tr>
        <tr>
          <td>North</td>
          <td>Wellington</td>
          {renderCellInput(
            'North - Wellington Clinic - Operating Hours', 
            { contentEditable: false, rowSpan: 1 },
          )}
        </tr>
        <tr>
          <td rowSpan={2}>North West</td>
          <td>Portside drive-through</td>
          {renderCellInput(
            'North West - Portside drive-through - Operating Hours',
            { contentEditable: false, rowSpan: 1 },
          )}
        </tr>
        <tr>
          <td>East Devonport drive-through</td>
          {renderCellInput(
            'North West - East Devonport drive-through - Operating Hours',
            { contentEditable: false, rowSpan: 1 },
          )}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default StatewideRespiratoryClinicsCapacityTable
