//import { iteratePromiseChunks } from './../util/misc'

/**
 * Get all views with the provided view identifiers. Will return null for each
 * id that is not found
 */
export const getViews = callApi => async function(viewIds){
  var views = await callApi(
    //`api/SitViews?search=${encodeURIComponent('Windows User')}`)
    `api/SitViews`)
  return viewIds.map(id => {
    return views.find(v => v.viewIdentifier == id) || null
  })
}

/**
 * Get all the users controls.
 */
export const getControls = callApi => async function(){
  //return callApi(`api/SitControls?search=${encodeURIComponent('Windows User')}`)
  return callApi(`api/SitControls`)
}

/**
 * Saves a control's value back to the server.
 * @param {string} params.type The control type. Used to figure out how to
 * map the data to the format the server wants.
 */
export const putControlValue = callApi => async function(params){
  const { controlId, value, type } = params
  return callApi(`api/SitUserInputs`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // TODO We haven't provided this anywhere yet
      reportID: 1,
      controlIdentifier: controlId,
      userInput: value,
      // When the control is a drop down, this is the value of the selected
      // drop down. And the InputValue is the text value
      //ref_ReferenceID: null,
    })
  })
}


/**
 * Get data that was previously submitted for existing controls
 * @param {Array<string>} controlsIds
 */
/*export const getControlDefaultValues = callApi => async function(controlIds){
  await iteratePromiseChunks(controlIds, async id => {
    await callApi(`api/SitControls?controlIdentifier=${id}&search=default`)
    .then(result => {
      debugger
    })
  }, 4)
}*/

/**
 * Get data that was previously submitted for existing controls
 * @param {Array<string>} controlsIds
 */
/*export const getControlValues = callApi => async function(controlIds){
  await iteratePromiseChunks(controlIds, async id => {
    await callApi(`api/SitUserInputs?controlIdentifier=${id}`)
    .then(result => {
      debugger
    })
  }, 4)
}*/

/**
 * @param {boolean} params.preApproved Is this preApproved or not
 */
export const submitData = callApi => async function(params){
  const { preApproved } = params
  return callApi(`api/SitUserInputReceipts?submission=true&preapproval=${
    preApproved ? 'True' : 'False'}`)
}