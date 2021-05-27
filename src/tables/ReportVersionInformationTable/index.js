import * as React from 'react'
import { EditableTable as Table } from './../../components'

const { Fragment, useState, useEffect } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_0C9067D0-A17C-42CE-9496-9A8C5EDF47C7': 'Report number',
  'Control_B45E5953-E1CB-4966-9964-15E5AE2CA9EB': 'Report frequency',
  'Control_A53896F0-8D17-4C67-BC2A-D71599FCF462': 'Date and time of distribution',
  'Control_09F5F9C3-CB26-48A4-A935-171A0DD33F40': 'Prepared by',
  'Control_D951B5BD-859D-44BB-A52E-E13E4B1306E5': 'Authorised by',
  'Control_195A4ED1-8BFF-4BE3-BE76-084A5D1F57A2': 'Date and time authorised',
  'Control_D6EC10F6-0150-4294-8E87-24BBAF18AD80': 'Current response level',
  'Control_18F835A1-F34C-4D38-8A22-2FB92C2692B0': 'Distribution',
}

const cellStyle = {
  textAlign: 'left',
}


/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const ReportVersionInformationTable = props => {

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
      <tbody>
        <tr>
          <th className="header-one" style={cellStyle}>Report number</th>
          {renderCellInput('Report number', { contentEditable: false, rowSpan: 1, cellStyle })}
          <th className="header-one" style={cellStyle}>Report frequency</th>
          {renderCellInput('Report frequency', { contentEditable: false, rowSpan: 1, cellStyle })}
        </tr>
        <tr>
          <th className="header-one" style={cellStyle}>Date and time of distribution</th>
          {renderCellInput('Date and time of distribution', { contentEditable: false, rowSpan: 1, cellStyle })}
          <th className="header-one" style={cellStyle}>Prepared by</th>
          {renderCellInput('Prepared by', { contentEditable: false, rowSpan: 1, cellStyle })}
        </tr>
        <tr>
          <th className="header-one" style={cellStyle}>Authorised by</th>
          {renderCellInput('Authorised by', { contentEditable: false, rowSpan: 1, cellStyle })}
          <th className="header-one" style={cellStyle}>Date and time authorised</th>
          {renderCellInput('Date and time authorised', { contentEditable: false, rowSpan: 1, cellStyle })}
        </tr>
        <tr>
          <th className="header-one" style={cellStyle}>Current response level</th>
          {renderCellInput('Current response level', { contentEditable: false, colSpan: 3, rowSpan: 1, cellStyle })}
        </tr>
        <tr>
          <th className="header-one" style={cellStyle}>Distribution</th>
          {renderCellInput('Distribution', { contentEditable: false, colSpan: 3, rowSpan: 1, cellStyle })}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default ReportVersionInformationTable

