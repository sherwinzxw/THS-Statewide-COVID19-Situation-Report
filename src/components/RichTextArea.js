import * as React from 'react'
import TextInput from './TextInput'

const { useRef, useEffect } = React

const RichTextArea = props => {

  const inputRef = useRef()

  useEffect(() => {
    var ele = inputRef.current
    $(ele).summernote()
  }, [])

  return <TextInput 
    multiline
    className="RichText"
    inputRef={inputRef}
    {...props}
  />
}

export default RichTextArea