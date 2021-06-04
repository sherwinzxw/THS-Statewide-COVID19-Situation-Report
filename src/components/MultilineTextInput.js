import * as React from 'react'
import classNames from 'classnames'
import { RECEIPT_STATUS_ENUM } from './../util/controls'
import { isParentElement } from './../util/misc'

const { useState, useEffect, useRef } = React

const ExpandButton = ({ onPress, ...props }) => <svg 
  height="24px" 
  viewBox="0 0 24 24" 
  width="24px" 
  fill="#000000"
  onClick={onPress}
  style={{cursor: 'pointer'}}
  {...props}
>
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
</svg>

const ShrinkButton = ({ onPress, ...props }) => <svg 
  enableBackground="new 0 0 24 24" 
  height="24px" 
  viewBox="0 0 24 24" 
  width="24px" 
  fill="#000000"
  onClick={onPress}
  style={{cursor: 'pointer'}}
  {...props}
>
  <rect fill="none" height="24" width="24"/>
  <path d="M22,3.41l-5.29,5.29L20,12h-8V4l3.29,3.29L20.59,2L22,3.41z M3.41,22l5.29-5.29L12,20v-8H4l3.29,3.29L2,20.59L3.41,22z"/>
</svg>

const MultilineTextInput = props => {
  const { 
    header, 
    onChangeText, 
    errorMessage, 
    invalid, 
    maxLength,
    value: defaultValue = '',
    id,
    className,
    inputRef,
    receiptStatus,
  } = props

  const containerRef = useRef()

  var [value, setValue] = useState(defaultValue)
  var [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const onShowFullscreen = () => {
    document.body.style.overflow = 'hidden'
    setFullscreen(true)
  }

  const onHideFullscreen = () => {
    document.body.style.overflow = 'visible'
    setFullscreen(false)
  }

  const maybeClose = (event) => {
    if (!fullscreen) return
    var container = containerRef.current
    if (!container) return
    // Prevent clicks on the popup from closing it
    if (isParentElement(event.target, container)) return
    onHideFullscreen()
  }

  const maybeEscape = event => {
    if (event.key == 'Escape'){
      event.preventDefault()
      onHideFullscreen()
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', maybeClose)
    document.body.addEventListener('keydown', maybeEscape)
    return () => {
      document.body.removeEventListener('click', maybeClose)
      document.body.removeEventListener('keydown', maybeEscape)
    }
  })

  return <div 
    className={classNames({
      ['Control']: true,
      ['MultilineTextInput']: true,
      ['invalid']: invalid,
      [className || '']: true,
      ['SubmittedForApproval']: receiptStatus == RECEIPT_STATUS_ENUM.SUBMITTED_FOR_APPROVAL,
      ['Approved']: receiptStatus == RECEIPT_STATUS_ENUM.APPROVED,
      ['SubmittedForAuthorisation']: receiptStatus == RECEIPT_STATUS_ENUM.SUBMITTED_FOR_AUTHORISATION,
      ['Authorised']: receiptStatus == RECEIPT_STATUS_ENUM.AUTHORISED,
    })}
  >
    {header ? <label>{header}</label> : null}
    <div className="textarea-container">
      <textarea 
        id={id}
        maxLength={maxLength}
        onInput={e => {
          setValue(e.target.value)
          onChangeText(e.target.value)
        }}
        value={value}
        key={id}
        ref={inputRef}
      />
      <ExpandButton 
        className="ExpandButton" 
        onPress={onShowFullscreen}
      />
    </div>
    {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
    {fullscreen ? <div className="Modal" style={{zIndex: 99}}>
      <div className="UIBlock" />
      <div className="textarea-container" ref={containerRef}>
        <textarea
          className="MultilineTextInput-fullscreen"
          maxLength={maxLength}
          onInput={e => {
            setValue(e.target.value)
            onChangeText(e.target.value)
          }}
          value={value}
        />
        <ShrinkButton 
          className="ExpandButton" 
          onPress={onHideFullscreen}
        />
      </div>
    </div> : null}
  </div>
}

export default MultilineTextInput
