import * as React from 'react'
import Table from '../../components/EditableTable'
import controlMap from './controlMap'

const { Fragment } = React

const RespiratoryClinicPresentations = props => {

  return <Table
    controlMap={controlMap}
  >
    {({ renderCellInput, renderCellError }) => <Fragment>
      <thead>
        <tr>
          <th>Location</th>
        </tr>
      </thead>
    </Fragment>}
  </Table>
}

export default RespiratoryClinicPresentations