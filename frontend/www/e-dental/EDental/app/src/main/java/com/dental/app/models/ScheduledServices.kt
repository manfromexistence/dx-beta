package com.dental.app.models

data class ScheduledServices(
    val date : String? = "",
    val dentistName : String? = "",
    val patientName : String? = "",
    val patientUUID : String? = "",
    val phoneNo : String? = "",
    val request : String? = "",
    val serviceName : String? = "",
    val time : String? = "",
    val documentID : String? = "",
)
