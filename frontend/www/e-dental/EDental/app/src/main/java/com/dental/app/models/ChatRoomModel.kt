package com.dental.app.models

import com.google.firebase.Timestamp


data class ChatRoomModel(
    val chatroomId : String? = null,
    val userIds : List<String> = listOf("",""),
    val timestamp: Timestamp = Timestamp.now(),
    val lastSenderId : String = ""
)
