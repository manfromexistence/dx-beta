package com.dental.e_dentaladmin.models

data class ProductModel(
    val productName : String? = "",
    val description : String? = "",
    val brand : String? = "",
    val productPrice : Long? = 0L,
    val pID : String? = "",
    val url : String? = "",
)
