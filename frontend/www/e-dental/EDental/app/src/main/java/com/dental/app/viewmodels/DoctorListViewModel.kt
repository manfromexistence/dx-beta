package com.dental.app.viewmodels

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.models.DoctorListModel
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class DoctorListViewModel : ViewModel() {

    private val _doctorsList: MutableLiveData<ArrayList<DoctorListModel>> = MutableLiveData()
    val doctorsList : LiveData<ArrayList<DoctorListModel>> get() = _doctorsList


    private fun getDoctorsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("dentists")
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<DoctorListModel>()
                        for (document in documents) {
                            val achievement = document.getString("achievement")
                            val certificate = document.getString("certificate")
                            val diploma = document.getString("diploma")
                            val dob = document.getString("dob")
                            val experience = document.getString("experience")
                            val name = document.getString("name")!!
                            val surname = document.getString("surname")!!
                            val uuid = document.getString("uuid")!!

                            list.add(DoctorListModel(achievement, certificate, diploma, dob, experience, name, surname, uuid))
                        }
                        _doctorsList.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<DoctorListModel>()
                        list.clear()
                        _doctorsList.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

    init {
        getDoctorsList()
    }
}