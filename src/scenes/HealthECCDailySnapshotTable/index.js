import * as React from 'react'
import { EditableTable as Table } from './../../components'

const { Fragment, useState, useEffect } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_0DB14114-9D81-4504-82D9-C4FEDBCF6728': 'Locally acquired - New Cases',
  'Control_5B630D65-3D4F-4A4D-A6EB-AA989E206CEE': 'Overseas acquired - New Cases',
  'Control_6E4544D9-2D5C-405A-A95A-407FB88D4EA9': 'Locally acquired - Total Active Cases',
  'Control_F83CDA8A-86AC-4BEE-B037-DC12E4472569': 'Overseas acquired - Total Active Cases',
  'Control_DF11A0E1-0C20-424C-9220-DE93D8081BBE': 'Total Cases to Date',
  'Control_32445129-F57C-4FA0-9E0B-B79D80B249DA': 'Laboratory Tests Completed in the last 24 hours',
  'Control_EB5DBDFB-9D26-4FD2-94AF-6C135F295C72': 'Total Laboratory Tests',
  'Control_B8379A26-A928-4A13-8299-084FEF5CAC06': 'Case Recovered',
  'Control_BE9F86A1-E03E-405C-9165-1DB01FFC8ECF': 'Hospital Inpatients',
  'Control_49612F6F-FAE9-4B62-AC0A-3AE1AF687B92': 'ICU Patients',
  'Control_93D6B180-94D1-406C-9263-6920EA79E9FA': 'Total Deaths',
}

/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const HealthECCDailySnapshotTable = props => {

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
          <th colSpan={2}>New Cases</th>
          <th colSpan={2}>Total Active Cases</th>
          <th rowSpan={2}>Total Cases to Date</th>
        </tr>
        <tr className="header-two">
          <th>Locally acquired</th>
          <th>Overseas acquired</th>
          <th>Locally acquired</th>
          <th>Overseas acquired</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {renderCellInput('Locally acquired - New Cases')}
          {renderCellInput('Overseas acquired - New Cases')}
          {renderCellInput('Locally acquired - Total Active Cases')}
          {renderCellInput('Overseas acquired - Total Active Cases')}
          {renderCellInput('Total Cases to Date')}
        </tr>
        <tr>
          {renderCellError('Locally acquired - New Cases')}
          {renderCellError('Overseas acquired - New Cases')}
          {renderCellError('Locally acquired - Total Active Cases')}
          {renderCellError('Overseas acquired - Total Active Cases')}
          {renderCellError('Total Cases to Date')}
        </tr>
      </tbody>
      <thead>
        <tr className="header-one">
          <th colSpan={2}>Laboratory Tests Completed in the last 24 hours</th>
          <th colSpan={2}>Total Laboratory Tests (excluding Saliva Tests)</th>
          <th>Cases Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {renderCellInput(
            'Laboratory Tests Completed in the last 24 hours', { colSpan: 2 },
          )}
          {renderCellInput('Total Laboratory Tests', { colSpan: 2 })}
          {renderCellInput('Case Recovered')}
        </tr>
        <tr>
          {renderCellError(
            'Laboratory Tests Completed in the last 24 hours', { colSpan: 2 },
          )}
          {renderCellError('Total Laboratory Tests', { colSpan: 2 })}
          {renderCellError('Case Recovered')}
        </tr>
      </tbody>
      <thead>
        <tr className="header-one">
          <th colSpan={2}>Hospital Inpatients</th>
          <th colSpan={2}>ICU Patients</th>
          <th>Total Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {renderCellInput('Hospital Inpatients', { colSpan: 2 })}
          {renderCellInput('ICU Patients', { colSpan: 2 })}
          {renderCellInput('Total Deaths')}
        </tr>
        <tr>
          {renderCellError('Hospital Inpatients', { colSpan: 2 })}
          {renderCellError('ICU Patients', { colSpan: 2 })}
          {renderCellError('Total Deaths')}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default HealthECCDailySnapshotTable
