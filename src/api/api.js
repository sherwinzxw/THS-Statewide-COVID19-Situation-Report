import { isValidControl } from './../util/misc'

/**
 * Get all views with the provided view identifiers. Will return null for each
 * id that is not found
 */
export const getViews = callApi => async function(viewIds){
  var views = await callApi(
    `api/SitViews?search=${encodeURIComponent('Windows User')}`)
    //`api/SitViews`)
  return viewIds.map(id => {
    return views.find(v => v.viewIdentifier == id) || null
  })
}

/**
 * Get all the users controls.
 */
export const getControls = callApi => async function(){
  return callApi(`api/SitControls?search=${encodeURIComponent('Windows User')}`)
  //return callApi(`api/SitControls`)
  .then(controls => controls.filter(isValidControl))
}

/**
 * Saves a control's value back to the server.
 * @param {string} params.type The control type. Used to figure out how to
 * map the data to the format the server wants.
 */
export const putControlValue = callApi => async function(params){
  const { controlId, value, reportId } = params
  if (!reportId)
    throw new Error(`'reportId' is required.`)
  return callApi(`api/SitUserInputs`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reportID: Number(reportId),
      controlIdentifier: controlId,
      value: value,
      // When the control is a drop down, this is the value of the selected
      // drop down. And the InputValue is the text value
      //ref_ReferenceID: null,
    })
  })
}

/**
 * @param {boolean} params.preApproved Is this preApproved or not
 */
export const submitData = callApi => async function(params){
  const { preApproved } = params
  return callApi(`api/SitUserInputReceipts?submission=true&preapproval=${
    preApproved ? 'True' : 'False'}`)
}

export const getCurrentUser = callApi => async function(){
  return callApi(`api/SitUsers?search=${encodeURIComponent('Windows User')}`)
}