package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.MessagingScreen
import com.dental.app.models.ServiceModel
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MessagingViewModel : ViewModel() {

    private val _otherUser: MutableLiveData<MessagingScreen.FCMToken> = MutableLiveData()
    val otherUser : LiveData<MessagingScreen.FCMToken> get() = _otherUser


    fun getOtherUserDetails(user : String) {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            db.collection("tokens").document(user).get()
                .addOnSuccessListener { documents ->
                    if (documents.exists()) {
                        val list : MessagingScreen.FCMToken
                        val uuid = documents.getString("uuid")
                        val token = documents.getString("token")
                         list = MessagingScreen.FCMToken(uuid, token)
                        _otherUser.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list : MessagingScreen.FCMToken = MessagingScreen.FCMToken("","")
                        _otherUser.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }
}