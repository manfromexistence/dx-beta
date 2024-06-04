package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.ConfirmServiceSchedule
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UpdateViewModel : ViewModel() {



    private val _updates : MutableLiveData<ArrayList<ConfirmServiceSchedule.UpdateModel>> = MutableLiveData()
    val updates : LiveData<ArrayList<ConfirmServiceSchedule.UpdateModel>> get() = _updates


    private fun getUpdates() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("updates").whereEqualTo("uuid",FirebaseAuth.getInstance().currentUser!!.uid)
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<ConfirmServiceSchedule.UpdateModel>()
                        for (document in documents) {
                            val updateType = document.getString("updateType")
                            val date = document.getString("date")
                            val time = document.getString("time")
                            val serviceName = document.getString("serviceName")!!
                            val dentistName = document.getString("dentistName")!!
                            val patientName = document.getString("patientName")!!
                            val uuid = document.getString("uuid")!!

                            list.add(ConfirmServiceSchedule.UpdateModel(updateType,date, time,serviceName,dentistName,patientName,uuid))
                        }
                        _updates.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<ConfirmServiceSchedule.UpdateModel>()
                        list.clear()
                        _updates.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

    init {
        getUpdates()
    }

}