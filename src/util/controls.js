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
import ventilatorCapacityControlMap from './../tables/VentilatorCapacityTable/controlMap'
import vaccinesAdministeredDailyStateGovernmentControlMap from 
  '../tables/VaccinesAdministeredDailyStateGovernmentTable/controlMap'
import vaccinesAdministeredCumulativeStateGovernmentControlMap from 
  '../tables/VaccinesAdministeredCumulativeStateGovernmentTable/controlMap'
import vaccinesAdministeredCumulativeControlMap from 
  '../tables/VaccinesAdministeredCumulativeTable/controlMap'
import checkInTASApplicationControlMap from 
  '../tables/CheckInTASApplicationTable/controlMap'
import respiratoryClinicPresentationsControlMap from 
  '../tables/RespiratoryClinicPresentationsTable/controlMap'


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
    ...otherProps
  } = params
  
  var replacePoint = layout.findIndex(control => {
    return !!controlMap[control.key]
  })

  // If we don't find any of the respective controls then don't inject this
  // custom control
  if (replacePoint == -1)
    return { layout, onChangeValue }

  layout = layout.slice(0)

  var valuesMap = {}, errorsMap = {}, headersMap = {}
  layout = layout.filter(control => {
    // Hijack this loop to create a hashmap of values too but only if the
    // control is in our control map
    var isInMap = !!controlMap[control.key]
    if (isInMap){
      valuesMap[control.key] = control.value
      errorsMap[control.key] = control.errorMessage
      headersMap[control.key] = control.header
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
    header: headersMap,
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
  return  { layout, onChangeValue, ...otherProps }
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

export const combineVentilatorCapacityControlMap = groupControls({
  controlMap: ventilatorCapacityControlMap,
  newKey: 'VentilatorCapacity',
})

export const combineVaccinesAdministeredDailyStateGovernmentControlMap = groupControls({
  controlMap: vaccinesAdministeredDailyStateGovernmentControlMap,
  newKey: 'VaccinesAdministeredDailyStateGovernment',
})

export const combineVaccinesAdministeredCumulativeStateGovernmentControlMap = groupControls({
  controlMap: vaccinesAdministeredCumulativeStateGovernmentControlMap,
  newKey: 'VaccinesAdministeredCumulativeStateGovernment',
})

export const combineVaccinesAdministeredCumulativeControlMap = groupControls({
  controlMap: vaccinesAdministeredCumulativeControlMap,
  newKey: 'VaccinesAdministeredCumulative',
})

export const combineCheckInTASApplicationControlMap = groupControls({
  controlMap: checkInTASApplicationControlMap,
  newKey: 'CheckInTASApplication',
})

export const combineRespiratoryClinicPresentationsControlMap = groupControls({
  controlMap: respiratoryClinicPresentationsControlMap,
  newKey: 'RespiratoryClinicPresentations',
})

const rollingCalendarGroups = [
  {
    'Control_B85DE61A-4889-48A4-AA80-77C02E067BEF': 'Best Western',
    'Control_08B01F7A-1837-4909-B9A5-6F5F849ACB84': 'IBIS Hotel',
    'Control_CDED5C59-4DF2-4CC0-9F66-AFF7719DA425': 'Travel Lodge Airport',
    'Control_3B6788E3-A8BF-4376-8D7B-7C5202E425B3': 'Hotel Peppers Seaport',
    'Control_5D80844D-62C3-4455-85AC-BA9DF35D9A49': 'Sunrise Hotel',
    'Control_296EE2C8-CA4B-4FEE-B579-0A77610F0263': 'Screening Clinic (Trial)',
  },
  {
    'Control_127DB1A4-8CD6-496C-941A-A19C4F133FB1': 'Compliance - Saliva and PCR Tests - Tests conducted',
    'Control_9AE615FA-DAE8-43F5-986C-415C039E8042': 'Compliance - Saliva and PCR Tests - Onsite >30 minutes',
  },
  
]

export const combineRollingCalendarControls = (props) => {
  return rollingCalendarGroups.reduce((existingProps, controlMap) => {
    return groupControls({
      controlMap,
      newKey: 'RollingCalendarMulti',
    })(existingProps)
  }, props)
}


export const RECEIPT_STATUS_ENUM = {
  'SUBMITTED_FOR_APPROVAL': 'Submitted for Approval',
  'APPROVED': 'Approved',
  'SUBMITTED_FOR_AUTHORISATION': 'Submitted for Authorisation',
  'AUTHORISED': 'Authorised',
}