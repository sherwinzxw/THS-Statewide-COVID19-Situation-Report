import * as React from 'react'
import Form from './Form'
import { Card, Button } from './../../components'
import { exportCSV, runOnControl, convertObjToCsv } from './../../util/misc'

const Page = props => {
  const { layout, onChangeValue } = props

  var keyValueMap = {}
  runOnControl(
    // Shim a schema structure so we can use the runOnControl method
    {
      layout: [{
        type: 'page',
        layout,
      }]
    }, 
    o => {
      const { type, header, key, value } = o
      switch(type){
        case 'header-two': 
        case 'header-five': return
        case 'Number':
        case 'RichText':
        case 'DataLabel':
        default:
          keyValueMap[key] = {
            key,
            value,
            label: header,
          }
      }
    }
  )

  const onExportCSV = () => {

    // List all duplicate labels
    var tempLabelHash = {}
    var duplicateLabelsHash = {}
    Object.values(keyValueMap).forEach(dto => {
      var { label } = dto
      if (tempLabelHash[label]){
        duplicateLabelsHash[label] = true
        return
      }
      tempLabelHash[label] = true
    })

    // Aim to map to label, but if the label isn't unique, then use the key
    var csvJsonMap = {}
    Object.values(keyValueMap).forEach(dto => {
      var { key, label, value } = dto
      if (duplicateLabelsHash[label] || keyValueMap[label]){
        // The label is ambigious, don't use it
        csvJsonMap[key] = value
        return
      }
      csvJsonMap[label] = value
    })

    exportCSV(convertObjToCsv(csvJsonMap), 'temp.csv')
  }

  return <div className="Page">
    <Card title="Data Request Form">
      <Button 
        title="Download CSV Import Template" 
        onPress={onExportCSV}
      />
      {layout.map(o => <Form {...o} onChangeValue={onChangeValue} />)}
    </Card>
  </div>
}

export default Page
