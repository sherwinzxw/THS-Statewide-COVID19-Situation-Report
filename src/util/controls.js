import confirmedCasesControlMap from '../tables/ConfirmedCasesTable/controlMap'
import { 
  controlMap as healthECCDailySnapshotControlsMap 
} from '../tables/HealthECCDailySnapshotTable'
import {
  controlMap as statewideRespiratoryClinicsCapacityControlsMap
} from './../tables/StatewideRespiratoryClinicsCapacityTable'
import { 
  controlMap as personsTestedControlsMap } from './../tables/PersonsTestedTable'
import { 
  controlMap as reportVersionInformationControlsMap
} from './../tables/ReportVersionInformationTable'
import { 
  controlMap as respiratoryClinicAppointmentsControlsMap
} from './../tables/RespiratoryClinicAppointmentsTable'
import emergencyDepartmentPresentationsWithILIControlMap 
  from './../tables/EmergencyDepartmentPresentationsWithILITable/controlMap'
import availableBedsControlMap from './../tables/AvailableBedsTable/controlMap'
import vaccinesAdministeredDailyControlMap from 
  './../tables/VaccinesAdministeredDailyTable/controlMap'
import vaccinesAdministeredCumulativeControlMap from 
  '../tables/VaccinesAdministeredCumulativeTable/controlMap'


/**
 * Iterate over a schema and run a function over each control and replace the
 * control with what's returned from the function.
 */
export const runOnControl = function(schema, controlMapFunc){
  return {
    ...schema,
    layout: schema.layout.map(page => ({
      ...page,
      layout: page.layout.map(form => ({
        ...form,
        layout: form.layout.map(controlMapFunc)
      }))
    }))
  }
}


/**
 * Groups all the controls in the provided control map into a single control
 * where values for are passed down as a hashmap. Returns a function that
 * takes `layout` and `onChangeValue` as inputs and returns a modified 
 * `layout` that includes only the single control and a modified 
 * `onChangeValue` that calls the passed in `onChangeValue` for each 
 * individual control change.
 */
export const groupControls = ({ controlMap, newKey }) => (params) => {
  var { 
    layout, 
    onChangeValue, 
  } = params
  
  var replacePoint = layout.findIndex(control => {
    return !!controlMap[control.key]
  })

  // If we don't find any of the respective controls then don't inject this
  // custom control
  if (replacePoint == -1)
    return { layout, onChangeValue }

  layout = layout.slice(0)

  var valuesMap = {}, errorsMap = {}
  layout = layout.filter(control => {
    // Hijack this loop to create a hashmap of values too but only if the
    // control is in our control map
    var isInMap = !!controlMap[control.key]
    if (isInMap){
      valuesMap[control.key] = control.value
      errorsMap[control.key] = control.errorMessage
    }
    // Return the untouched layout
    return !isInMap
  })

  // Add the custom control
  layout.splice(replacePoint, 0, {
    type: newKey,
    key: newKey,
    value: valuesMap,
    errorMessage: errorsMap,
  })

  let originalOnChangeValue = onChangeValue
  onChangeValue = (params) => {
    const { value, key } = params
    if (key != newKey)
      return originalOnChangeValue(params)
    Object.entries(value).forEach(([key, value]) => {
      originalOnChangeValue({ value, key })
    })
  }
  return  { layout, onChangeValue }
}

/**
 * Removes all the 'Confirmed cases in the last week' controls and injects
 * a single control that represents all of that data.
 */
export const combineConfirmedCasesControls = groupControls({
  controlMap: confirmedCasesControlMap,
  newKey: 'ConfirmedCases',
})

/**
 * Group controls into a table control for health ECC daily snapshot data.
 */
export const combineHealthECCDailySnapshotControls = groupControls({
  controlMap: healthECCDailySnapshotControlsMap,
  newKey: 'HealthECCDailySnapshot',
})

export const combineStatewideRespiratoryClinicsCapacityControls = groupControls({
  controlMap: statewideRespiratoryClinicsCapacityControlsMap,
  newKey: 'StatewideRespiratoryClinicsCapacity',
})


export const combinePersonsTestedControls = groupControls({
  controlMap: personsTestedControlsMap,
  newKey: 'PersonsTested',
})

export const combineReportVersionInformationControls = groupControls({
  controlMap: reportVersionInformationControlsMap,
  newKey: 'ReportVersionInformation',
})

export const combineRespiratoryClinicAppointmentControls = groupControls({
  controlMap: respiratoryClinicAppointmentsControlsMap,
  newKey: 'RespiratoryClinicAppointments',
})

export const combineEmergencyDepartmentPresentationsWithILIControlMap = groupControls({
  controlMap: emergencyDepartmentPresentationsWithILIControlMap,
  newKey: 'EmergencyDepartmentPresentationsWithILI',
})

export const combineAvailableBedsControlMap = groupControls({
  controlMap: availableBedsControlMap,
  newKey: 'AvailableBeds',
})

export const combineVaccinesAdministeredDailyControlMap = groupControls({
  controlMap: vaccinesAdministeredDailyControlMap,
  newKey: 'VaccinesAdministeredDaily',
})

export const combineVaccinesAdministeredCumulativeControlMap = groupControls({
  controlMap: vaccinesAdministeredCumulativeControlMap,
  newKey: 'VaccinesAdministeredCumulative',
})
