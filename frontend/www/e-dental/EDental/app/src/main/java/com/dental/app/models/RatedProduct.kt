package com.dental.app.models

data class RatedProduct(
    val productName : String? = "",
    val description : String? = "",
    val brand : String? = "",
    val productPrice : Long? = 0L,
    val pID : String? = "",
    val url : String? = "",
)
