import * as React from 'react'
import Engine from './scenes/Engine'

const { useEffect, useState } = React

const App = props => {

  var [schema, setSchema] = useState()

  useEffect(() => {
    /*fetch('https://frontdoor.dev.health.local/api/SitControls')
    .then(response => response.json())
    .then(result => {
      debugger
    })*/
    var result = [
      {
        "controlID":1,
        "controlIdentifier":"Control_0795c789-196b-4793-b232-5c76c32ec60e",
        "fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a",
        "label":"New Cases - Locally Acquired",
        "name":"NewCases_LocallyAcquired",
        "ref_Type":"Number",
        "ref_Domain":null,
        "ref_Category":null,
        "defaultValue":null,
        "maxLength":null,
        "attribute1":null,
        "attribute2":null,
        "attribute3":null,
        "attribute4":null,
        "attribute5":null,
        "sortOrder":1,
        "createdDateTime":
        "2021-05-05T15:36:13.323Z",
        "createdByDisplayName":"Zhao, Sherwin",
        "createdBySysName":"szhao",
        "lastModifiedDateTime":"2021-05-05T15:36:13.323Z",
        "lastModifiedByDisplayName":"Zhao, Sherwin",
        "lastModifiedBySysName":"szhao",
        "archiveFlag":false
      },
      {"controlID":2,"controlIdentifier":"Control_b036c469-878b-44ad-8eed-482673a0ade2","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"New Cases - Oversea Acquired","name":"NewCases_OverseaAcquired","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":2,"createdDateTime":"2021-05-06T10:22:30.177Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T10:22:30.177Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":3,"controlIdentifier":"Control_1f440c7c-31c4-4c78-bf7b-1d5fc32551d0","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Total Active Cases - Locally Acquired","name":"TotalActiveCases_LocallyAcquired","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":3,"createdDateTime":"2021-05-06T10:25:44.627Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T10:25:44.627Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":4,"controlIdentifier":"Control_c01f0a4c-b951-42f5-8cb4-da9f7cde6303","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Total Active Cases - Overseas Acquired","name":"TotalActiveCases_OverseasAcquired","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":4,"createdDateTime":"2021-05-06T10:26:11.49Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T10:26:11.49Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":5,"controlIdentifier":"Control_5b07c5b3-9a5a-40a1-a11c-0573da15b147","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Total Cases to Date","name":"TotalCasesToDate","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":5,"createdDateTime":"2021-05-06T12:50:56.04Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:50:56.04Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":6,"controlIdentifier":"Control_2e86d931-11c2-4148-88ac-de33bc94d241","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Laboratory Tests Completed in the last 24 hours","name":"LaboratorytestsCompletedIn24Hours","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":6,"createdDateTime":"2021-05-06T12:57:38.183Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:57:46.187Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":7,"controlIdentifier":"Control_3eec3324-eae8-4a81-91ac-77d908afc4f3","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Total Laboratory Tests","name":"TotalLaboratoryTests","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":7,"createdDateTime":"2021-05-06T12:58:13.367Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:58:22.633Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":8,"controlIdentifier":"Control_6d097190-2324-4b1a-b14e-2d2fca65a7d2","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Case Recovered","name":"CasesRecovered","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":8,"createdDateTime":"2021-05-06T12:58:39.807Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:58:46.123Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":9,"controlIdentifier":"Control_aa1f2ca2-51df-4bd4-ab6e-ae317508b1da","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Hospital Inpatients","name":"HospitalInpatients","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":9,"createdDateTime":"2021-05-06T12:59:01.607Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:59:01.607Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":10,"controlIdentifier":"Control_a1683b47-d7b0-4051-a1c4-52117bfc79c6","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"ICU Patients","name":"IcuPatients","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":10,"createdDateTime":"2021-05-06T12:59:55.393Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T12:59:55.393Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":11,"controlIdentifier":"Control_2ec7604a-430e-47c6-96f9-671ce6869c40","fk_ViewID":"View_bf06c8a7-c758-493d-ab5f-62627c7e189a","label":"Total Deaths","name":"TotalDeaths","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":11,"createdDateTime":"2021-05-06T13:00:10.423Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:00:10.423Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":22,"controlIdentifier":"Control_D76A60CD-EA2C-412A-9407-406B891E7DB0","fk_ViewID":"View_84f9522d-177f-4486-8f73-7b6b95a7267c","label":"Total number of registere venues","name":"Table_CheckInTas_RegisteredVenueTotal","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":1,"createdDateTime":"2021-05-06T13:27:30.597Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:27:30.597Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":23,"controlIdentifier":"Control_2FEB0B10-1822-48A4-904F-505978B18178","fk_ViewID":"View_84f9522d-177f-4486-8f73-7b6b95a7267c","label":"Pending venue registrations","name":"Table_CheckInTas_PendingVenueRegistrations","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":2,"createdDateTime":"2021-05-06T13:27:30.597Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:27:30.597Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":24,"controlIdentifier":"Control_2C9508EB-E68B-402F-85D2-BC5D96BE1E6A","fk_ViewID":"View_84f9522d-177f-4486-8f73-7b6b95a7267c","label":"Welcome pack sent in the past week","name":"Table_CheckInTas_WelcomePackSentInLastWeek","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":3,"createdDateTime":"2021-05-06T13:27:30.597Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:27:30.597Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":25,"controlIdentifier":"Control_B2683BBE-4595-4A6B-815F-3FBB8B80D1DD","fk_ViewID":"View_84f9522d-177f-4486-8f73-7b6b95a7267c","label":"Total check-ins","name":"Table_CheckInTas_CheckInsTotal","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":4,"createdDateTime":"2021-05-06T13:27:30.597Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:27:30.597Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false},{"controlID":26,"controlIdentifier":"Control_CF198E51-091C-43ED-840B-0F44AA9A03C7","fk_ViewID":"View_84f9522d-177f-4486-8f73-7b6b95a7267c","label":"Total venues that have check-ins","name":"Table_CheckInTas_CheckInVenuesNumber","ref_Type":"Number","ref_Domain":null,"ref_Category":null,"defaultValue":null,"maxLength":null,"attribute1":null,"attribute2":null,"attribute3":null,"attribute4":null,"attribute5":null,"sortOrder":5,"createdDateTime":"2021-05-06T13:27:30.597Z","createdByDisplayName":"Zhao, Sherwin","createdBySysName":"szhao","lastModifiedDateTime":"2021-05-06T13:27:30.597Z","lastModifiedByDisplayName":"Zhao, Sherwin","lastModifiedBySysName":"szhao","archiveFlag":false}
    ]

    var schema = {
      "schemaVersion": 5,
      "layout": [
        {
          "type": "page",
          "layout": [
            {
              "type": "form",
              "layout": result.map(r => ({ 
                key: r.controlIdentifier, 
                type: r.ref_Type, 
                header: r.label, 
              })),
            }
          ]
        }
      ]
    }
    setSchema(schema)
      
  }, [])

  if (!schema) return <p>Loading...</p>

  return <Engine schema={schema} />
}

export default App
