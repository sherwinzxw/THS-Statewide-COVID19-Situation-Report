import * as React from 'react'
import { Button, LoadingSpinner } from './../../components'
import { useRequestsContext } from './../../Requests'

const { useState } = React

const PreApprovalPrompt = props => {
  const { onClose } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState()
  const { submitData } = useRequestsContext()

  const onSubmit = ({ preApproved} ) => {
    setIsLoading(true)
    setError()
    submitData({ preApproved, })
    .then(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    })
    .catch(err => {
      setError(err)
      setIsLoading(false)
      throw err
    })
  }

  const onContinue = () => {
    window.location = 'http://www.dhhs.tas.gov.au/intranet'
  }

  if (isLoading)
    return <div className="ModalContent">
      <LoadingSpinner />
    </div>

  if (isSubmitted){
    return <div className="ModalContent">
      <h3>Success!</h3>
      <p>Your data has been successfully submitted.</p>
      <Button onPress={onContinue} title="Continue" />
    </div>
  }

  return <div className="ModalContent">
    <h3>Are you submitting with pre-approval?</h3>
    {error ? <p className="errorText">{error.message}</p> : null}
    <Button secondary onPress={onClose} title="Cancel" />
    <Button onPress={() => onSubmit({ preApproved: false })} title="No" />
    <Button onPress={() => onSubmit({ preApproved: true })} title="Yes" />
    
  </div>
}

export default PreApprovalPrompt