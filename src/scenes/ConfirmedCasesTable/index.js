import * as React from 'react'

const ConfirmedCasesTable = props => {
  return <table>
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
        <td>South</td>
        <td contentEditable></td>
        <td contentEditable></td>
        <td contentEditable></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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
  </table>
}

export default ConfirmedCasesTable
