

const callApi = function(url, options){
  return fetch(url, options)
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
  var views = await callApi(`${API_URL}/api/SitViews`)
  return viewIds.map(id => {
    return views.find(v => v.viewIdentifier == id) || null
  })
}

/**
 * Get all the users controls.
 */
export const getControls = async function(){
  return fetch(`${API_URL}/api/SitControls`)
  .then(response => response.json())
}