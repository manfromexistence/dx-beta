package com.dental.app.models

import com.google.firebase.Timestamp

data class ChatMessageModel(
    val message : String? = "",
    val senderId : String? = "",
    val timestamp: Timestamp  = Timestamp.now(),
)
