import * as React from 'react'
import Form from './Form'
import classNames from 'classnames'
import { Card, Button } from './../../components'
import { 
  exportCSV, 
  runOnControl, 
  convertObjToCsv, 
  convertCsvToObj, 
  debounce,
} from './../../util/misc'
import { useModalsContext } from './../../Modals'
import PreApprovalPrompt from './../PreApprovalPrompt'

const { useRef, useEffect, useCallback } = React

const debouncedRemoveDropZoneFlag = debounce(function(ele){
  ele.className = 'Page'
}, 500)


const Page = props => {
  const { layout, onChangeValue } = props
  const { showModal } = useModalsContext()

  const pageRef = useRef()

  const onDropHandler = useCallback(e => {
    var container = pageRef.current
    container.className = 'Page'
    e.preventDefault()
    var files = []
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      var item = e.dataTransfer.items[i]
      // If dropped items aren't files, reject them
      if (item.kind != 'file' || item.type != 'text/csv')
        return
      files.push(item.getAsFile())
    }

    // Process the files one at a time
    ;(async () => {
      var errors = [], csvObj = {}
      for (var i = 0; i < files.length; i ++){
        var file = files[i]
        var csvContent = await file.text()
        try {
          Object.assign(csvObj, convertCsvToObj(csvContent))
        } catch (err){
          console.error(err)
          errors.push(new Error(`Unable to parse file ${file.name}. ${
            err.message}`))
        }
      }
      if (errors.length){
        var { close } = showModal(<ErrorDisplay 
          errors={errors}
          onClose={() => close()}
        />)
        return
      }
      onImportCSV(csvObj)
    })()

  }, [])

  const onDragOverHandler = useCallback(e => {
    console.log('onDragOverHandler fired')
    var container = pageRef.current
    container.className = 'Page dropZoneActive'
    e.preventDefault()
  }, [])

  const onDragLeaveHandler = useCallback(e => {
    console.log('onDragLeaveHandler fired')
    var container = pageRef.current
    debouncedRemoveDropZoneFlag(container)
    e.preventDefault()
  }, [])

  useEffect(() => {
    var container = pageRef.current
    container.addEventListener('drop', onDropHandler)
    container.addEventListener('dragover', onDragOverHandler)
    container.addEventListener('dragleave', onDragLeaveHandler)
    return () => {
      container.removeEventListener('drop', onDragOverHandler)
      container.removeEventListener('dragover', onDragOverHandler)
      container.removeEventListener('dragleave', onDragLeaveHandler)
    }
  }, [])

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

    exportCSV(convertObjToCsv(csvJsonMap), 'sit import template.csv')
  }

  const onImportCSV = (csvObj) => {
    // Map each CSV header back to their respective keys in the same way
    // the file is createf in `onExportCSV`.
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
    var csvKeyMap = {}
    Object.values(keyValueMap).forEach(dto => {
      var { key, label } = dto
      if (duplicateLabelsHash[label] || keyValueMap[label]){
        // The label is ambigious, don't use it
        csvKeyMap[key] = key
        return
      }
      csvKeyMap[label] = key
    })

    Object.entries(csvObj).forEach(([csvKey, value]) => {
      var realKey = csvKeyMap[csvKey]
      if (value)
        onChangeValue({value, key: realKey})
    })

  }

  const onSaveDraft = () => {
    var { close } = showModal(<NotificationDisplay
      title="Draft data has been saved."
      onClose={() => close()}
    />)
  }

  const onSubmit = () => {
    var { close } = showModal(<PreApprovalPrompt
      onClose={() => close()}
    />)
  }


  return <div 
    className={"Page"} 
    ref={pageRef}
  >
    <Card title="Data Request Form">
      <Button 
        title="Download CSV Import Template" 
        onPress={onExportCSV}
      />
      {layout.map(o => <Form {...o} onChangeValue={onChangeValue} />)}
      <div className="dropZone">
        <div className="dropZoneInner" />
      </div>

      <div className="actionButtons">
        <Button 
          title="Save as Draft" 
          onPress={onSaveDraft}
        />
        <Button 
          title="Submit" 
          onPress={onSubmit}
        />
      </div>

    </Card>
    
  </div>
}

export default Page

const ErrorDisplay = props => {
  const { errors, onClose } = props
  return <div className="ModalContent">
    {errors.map(err => <p className="errorText">{err.message}</p>)}
    <Button onPress={onClose} title="Close" />
  </div>
}

const NotificationDisplay = props => {
  const { title, onClose } = props
  return <div className="ModalContent">
    <h3>{title}</h3>
    <Button onPress={onClose} title="Ok" />
  </div>
}
