package com.dental.e_dentaladmin.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.e_dentaladmin.models.ServiceModel
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ServiceViewModel : ViewModel() {

    private val _services: MutableLiveData<ArrayList<ServiceModel>> = MutableLiveData()
    val services : LiveData<ArrayList<ServiceModel>> get() = _services


    private fun getServices() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("services")
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<ServiceModel>()
                        for (document in documents) {
                            val serviceName = document.getString("serviceName")
                            val description = document.getString("description")
                            val offeredBy = document.getString("offeredBy")
                            val price = document.getLong("price")!!

                            list.add(ServiceModel(offeredBy, serviceName, price, description))
                        }
                        _services.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<ServiceModel>()
                        list.clear()
                        _services.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

    init {
        getServices()
    }

}