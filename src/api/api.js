import { iteratePromiseChunks } from './../util/misc'

const callApi = function(path, options){
  // Make it a little more forgiving if the user accidently adds a leading 
  // slash
  if (path.startsWith('/'))
    path = path.slice(1)
  return fetch(`${API_URL}/${path}`, options)
  .then(response => {
    if (response.status < 200 || response.status >= 400){
      var error = new Error(response.statusText)
      throw error
    }
    return response.json()
  })
}

/**
 * Get all views with the provided view identifiers. Will return null for each
 * id that is not found
 */
export const getViews = async function(viewIds){
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
export const getControls = async function(){
  //return callApi(`api/SitControls?search=${encodeURIComponent('Windows User')}`)
  return callApi(`api/SitControls`)
}

/**
 * Saves a control's value back to the server.
 * @param {string} params.type The control type. Used to figure out how to
 * map the data to the format the server wants.
 */
export const putControlValue = async function(params){
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
      inputValue: value,
      // When the control is a drop down, this is the value of the selected
      // drop down. And the InputValue is the text value
      ref_ReferenceID: null,
    })
  })
}


/**
 * Get data that was previously submitted for existing controls
 * @param {Array<string>} controlsIds
 */
export const getControlDefaultValues = async function(controlIds){
  await iteratePromiseChunks(controlIds, async id => {
    await callApi(`api/SitControls?controlIdentifier=${id}&search=default`)
    .then(result => {
      debugger
    })
  }, 4)
}

/**
 * Get data that was previously submitted for existing controls
 * @param {Array<string>} controlsIds
 */
export const getControlValues = async function(controlIds){
  await iteratePromiseChunks(controlIds, async id => {
    await callApi(`api/SitUserInputs?controlIdentifier=${id}`)
    .then(result => {
      debugger
    })
  }, 4)
}