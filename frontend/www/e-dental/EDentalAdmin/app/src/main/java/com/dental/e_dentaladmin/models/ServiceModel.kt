package com.dental.e_dentaladmin.models

data class ServiceModel(
    val offeredBy : String? = "",
    val serviceName : String? = "",
    val price : Long? = 0L,
    val description : String? = ""
)
