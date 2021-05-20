import * as React from 'react'
import { EditableTable as Table } from './../../components'

const { Fragment } = React

/**
 * These are the specific controls this component will render.
 */
export const controlMap = {
  'Control_3B3D35A2-8C39-487C-AB06-736D71A073B6': 'South - Posivite cases confirmed',
  'Control_F46C08D4-BB51-4CBF-AFB3-BA2519252E1B': 'South - Deaths in last week',
  'Control_904210D0-9CC4-4298-BF23-31E8CEFEEF25': 'South - Total confirmed cases',
  'Control_111EB15A-EE0D-4D8E-B3A9-0E2F39782A61': 'South - Total deaths - Cumulative since 2 March 2020*',
  'Control_94E01147-F0ED-4AC6-983C-BE6E0A46EB87': 'South - Total people recovered - Cumulative since 2 March 2020*',
  'Control_5E982503-F1D3-4ADC-A2B1-E8001E592720': 'South - Total active cases  - Cumulative since 2 March 2020*',
  'Control_6352161E-6170-429E-89D2-4E152691164B': 'South - Total tests conducted  - Cumulative since 2 March 2020*',
  'Control_4CD3F3A6-8397-437D-A0B4-9BA95208DECB': 'North - Posivite cases confirmed',
  'Control_AF30CECA-3E68-4338-A640-14F9EB0FB09E': 'North - Deaths in last week',
  'Control_0EF538C6-B9A7-4B90-89C8-0723DC0F0D97': 'North - Total confirmed cases',
  'Control_81E1F614-4F15-4A69-8920-2D075728C21C': 'North - Total deaths - Cumulative since 2 March 2020*',
  'Control_ACD4329E-48C2-486A-A9E9-ABB63023D8C3': 'North - Total people recovered - Cumulative since 2 March 2020*',
  'Control_DEB99787-F6A8-48E7-B045-2908DD4AD367': 'North - Total active cases  - Cumulative since 2 March 2020*',
  'Control_D1A93575-A394-43B3-9DE2-EF23D42D5973': 'North - Total tests conducted  - Cumulative since 2 March 2020*',
  'Control_E5BF361C-D328-492E-AED5-90E11BD1D0D7': 'North West - Posivite cases confirmed',
  'Control_0C3D74DC-4F87-4077-BB98-6516AD1B47CB': 'North West - Deaths in last week',
  'Control_B2DC2D5B-A217-45CB-AED2-978930437FFD': 'North West - Total confirmed cases',
  'Control_1D78D5A2-E620-4B6D-8729-8056C428BB87': 'North West - Total deaths - Cumulative since 2 March 2020*',
  'Control_9D702387-244F-4748-968A-0B9AC55FD716': 'North West - Total people recovered - Cumulative since 2 March 2020*',
  'Control_89F54E00-467D-4392-B17E-E450E1E827F0': 'North West - Total active cases  - Cumulative since 2 March 2020*',
  'Control_855593B9-B5BD-4EB4-871B-8FADD45B66BA': 'North West - Total tests conducted  - Cumulative since 2 March 2020*',
  'Control_E39C5484-F78E-49A1-95CC-AB552ED44925': 'Interstate - Posivite cases confirmed',
  'Control_05239EAB-4202-4E37-BC42-BE8176617395': 'Interstate - Deaths in last week',
  'Control_E5FDD7B8-07C6-46C5-9F6C-656873959E13': 'Interstate - Total confirmed cases',
  'Control_DA771621-81A6-4C3A-8FBB-1BB5605E9CD7': 'Interstate - Total deaths - Cumulative since 2 March 2020*',
  'Control_42C33BBB-3E2F-4109-8726-56235E54911B': 'Interstate - Total people recovered - Cumulative since 2 March 2020*',
  'Control_24FE2C2E-DDFF-4BD3-99C4-2ABD735A9AF1': 'Interstate - Total active cases  - Cumulative since 2 March 2020*',
  'Control_563B3B82-D37A-4155-BD72-0504C4038E9D': 'Interstate - Total tests conducted  - Cumulative since 2 March 2020*',
  'Control_FCE9F38B-20FE-4DB7-9555-D3BD42D92481': 'Not Reported - Posivite cases confirmed',
  'Control_C800C1CF-7989-4C5D-8C77-E1C64477343C': 'Not Reported - Deaths in last week',
  'Control_AFACC80B-80EA-412A-BF2F-207327BAF507': 'Not Reported - Total confirmed cases',
  'Control_077F4294-2122-4E7F-BA6B-21794EBE2A62': 'Not Reported - Total deaths - Cumulative since 2 March 2020*',
  'Control_6E1FA739-39EF-4025-A716-A790611FFEC6': 'Not Reported - Total people recovered - Cumulative since 2 March 2020*',
  'Control_9AE832FF-803A-4C7D-814A-7DCDCB1FF4CC': 'Not Reported - Total active cases  - Cumulative since 2 March 2020*',
  'Control_B4D5D8A8-2123-4485-AA6A-AFFC7F73721A': 'Not Reported - Total tests conducted  - Cumulative since 2 March 2020*'
}



/**
 * @property {object} props.value This is a hash map of what the original 
 * control id was to the value.
 */
const ConfirmedCasesTable = props => {

  const { 
    value, 
    onChangeValue,
    errorMessage,
  } = props

  console.log('ConfirmedCasesTable#errorMessage', errorMessage)


  return <Table 
    value={value} 
    onChangeValue={onChangeValue}
    errorMessage={errorMessage}
    controlMap={controlMap}
  >
    {({ renderCellError, renderCellInput }) => <Fragment>
      <thead>
        <tr className="header-one">
          <th colSpan={3}>New cases in the last week</th>
          <th>Total confirmed cases</th>
          <th colSpan={4}>Cumulative since 2 March 2020 *</th>
        </tr>
        <tr className="header-two">
          <th></th>
          <th>Positive cases confirmed</th>
          <th>Deaths in last week</th>
          <th>Total confirmed cases</th>
          <th>Total deaths</th>
          <th>Total people recovered</th>
          <th>Total active cases</th>
          <th>Total tests conducted</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>South</td>
          {renderCellInput('South - Posivite cases confirmed')}
          {renderCellInput('South - Deaths in last week')}
          {renderCellInput('South - Total confirmed cases')}
          {renderCellInput('South - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('South - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('South - Posivite cases confirmed')}
          {renderCellError('South - Deaths in last week')}
          {renderCellError('South - Total confirmed cases')}
          {renderCellError('South - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('South - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>North</td>
          {renderCellInput('North - Posivite cases confirmed')}
          {renderCellInput('North - Deaths in last week')}
          {renderCellInput('North - Total confirmed cases')}
          {renderCellInput('North - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('North - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('North - Posivite cases confirmed')}
          {renderCellError('North - Deaths in last week')}
          {renderCellError('North - Total confirmed cases')}
          {renderCellError('North - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('North - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>North West</td>
          {renderCellInput('North West - Posivite cases confirmed')}
          {renderCellInput('North West - Deaths in last week')}
          {renderCellInput('North West - Total confirmed cases')}
          {renderCellInput('North West - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('North West - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('North West - Posivite cases confirmed')}
          {renderCellError('North West - Deaths in last week')}
          {renderCellError('North West - Total confirmed cases')}
          {renderCellError('North West - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('North West - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>Interstate</td>
          {renderCellInput('Interstate - Posivite cases confirmed')}
          {renderCellInput('Interstate - Deaths in last week')}
          {renderCellInput('Interstate - Total confirmed cases')}
          {renderCellInput('Interstate - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('Interstate - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('Interstate - Posivite cases confirmed')}
          {renderCellError('Interstate - Deaths in last week')}
          {renderCellError('Interstate - Total confirmed cases')}
          {renderCellError('Interstate - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('Interstate - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          <td rowSpan={2}>Not Reported</td>
          {renderCellInput('Not Reported - Posivite cases confirmed')}
          {renderCellInput('Not Reported - Deaths in last week')}
          {renderCellInput('Not Reported - Total confirmed cases')}
          {renderCellInput('Not Reported - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellInput('Not Reported - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
        <tr>
          {renderCellError('Not Reported - Posivite cases confirmed')}
          {renderCellError('Not Reported - Deaths in last week')}
          {renderCellError('Not Reported - Total confirmed cases')}
          {renderCellError('Not Reported - Total deaths - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total people recovered - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total active cases  - Cumulative since 2 March 2020*')}
          {renderCellError('Not Reported - Total tests conducted  - Cumulative since 2 March 2020*')}
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </Fragment>}
  </Table>
}

export default ConfirmedCasesTable
