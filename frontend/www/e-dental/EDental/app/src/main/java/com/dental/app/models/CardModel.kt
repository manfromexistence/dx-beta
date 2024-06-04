package com.dental.app.models

data class CardModel(
    val name : String? = "",
    val description : String? = "",
    val brand : String? = "",
    val price : String? = "",
    val productPhoto : String = "",
    val quantity : Long = 0L,
    val address : String = "",
    val uuid : String = "",
)
