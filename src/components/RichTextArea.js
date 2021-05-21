import * as React from 'react'
import TextInput from './TextInput'

const { useRef, useEffect } = React

const RichTextArea = props => {

  const { onChangeText } = props

  const inputRef = useRef()

  useEffect(() => {
    var ele = inputRef.current
    $(ele).summernote({
      onChange: function() { 
        debugger
      }
    })
    $(ele).on("summernote.change", function (e) {   // callback as jquery custom event 
      inputRef.current.innerText = e.target.value
      onChangeText(e.target.value)
    });
  }, [])

  return <TextInput 
    multiline
    className="RichText"
    inputRef={inputRef}
    {...props}
  />
}

export default RichTextArea