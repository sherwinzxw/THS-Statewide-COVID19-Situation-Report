import * as React from 'react'
import Table from '../EditableTable'

const { useRef, useState, Fragment } = React

const RollingCalendar = props => {

  //const { value } = props

  var now = new Date()

  var values = useRef({})

  const controlMap = {
    'Today -6': 'Today -6',
    'Today -5': 'Today -5',
    'Today -4': 'Today -4',
    'Today -3': 'Today -3',
    'Today -2': 'Today -2',
    'Today -1': 'Today -1',
    'Today': 'Today',
  }

  const onTableChangeValue = values => {

  }

  return <Table
    value={value} 
    onChangeValue={onTableChangeValue}
    errorMessage={{}}
    controlMap={controlMap}
  >
  {({ renderCellError, renderCellInput }) => <Fragment>
      <thead>
        <tr>
          <th>{formatDate(addDays(now, -6))}</th>
          <th>{formatDate(addDays(now, -5))}</th>
          <th>{formatDate(addDays(now, -4))}</th>
          <th>{formatDate(addDays(now, -3))}</th>
          <th>{formatDate(addDays(now, -2))}</th>
          <th>{formatDate(addDays(now, -1))}</th>
          <th>{formatDate(now)}</th>
          <th>Weekly total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {renderCellInput('Today -6')}
          {renderCellInput('Today -5')}
          {renderCellInput('Today -4')}
          {renderCellInput('Today -3')}
          {renderCellInput('Today -2')}
          {renderCellInput('Today -1')}
          {renderCellInput('Today')}
        </tr>
      </tbody>
    </Fragment>}
  </Table>
}

export default RollingCalendar


function addDays(date, days){
  var newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

function formatDate(date){
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}`
}


