package com.dental.app.viewmodels

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.DentistListActivity
import com.dental.app.MessagingScreen
import com.dental.app.models.DoctorListModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class RecentChatViewModel : ViewModel() {

    private val _doctorsList: MutableLiveData<ArrayList<DoctorListModel>> = MutableLiveData()
    val doctorsList : LiveData<ArrayList<DoctorListModel>> get() = _doctorsList


    private fun getDoctorsList(uids: ArrayList<MessagingScreen.RecentDentistModel>){
        val list = ArrayList<DoctorListModel>()
        for (doc in uids){
            viewModelScope.launch(Dispatchers.IO) {
                val db = Firebase.firestore
                val categoryCollection = db.collection("dentists").whereEqualTo("uuid",doc.dentist)
                categoryCollection.get()
                    .addOnSuccessListener { documents ->
                        if (!documents.isEmpty) {
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
                            Log.d("recentChats",list.size.toString() + " VM DENTISTS")
                        } else {
                            println("Error getting documents: No Document Found")
                            val l2 = ArrayList<DoctorListModel>()
                            l2.clear()
                            _doctorsList.value = l2
                        }
                    }
                    .addOnFailureListener { exception ->
                        println("Error getting documents: $exception")
               }
            }
        }
    }


    private val _chatList : MutableLiveData<ArrayList<MessagingScreen.RecentDentistModel>> = MutableLiveData()
    val chatList : LiveData<ArrayList<MessagingScreen.RecentDentistModel>> get() = _chatList

    private fun getUUID() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("recent_chats").whereEqualTo("yourUUID",FirebaseAuth.getInstance().currentUser!!.uid)
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<MessagingScreen.RecentDentistModel>()
                        for (document in documents) {
                            val myUUID = document.getString("yourUUID")
                            val dentistUUID = document.getString("dentist")
                            Log.d("recentCHat",dentistUUID!!)
                            list.add(MessagingScreen.RecentDentistModel(myUUID,dentistUUID))
                        }
                        _chatList.value = list
                        getDoctorsList(list)
                        Log.d("recentChats",list.size.toString() + " VM")
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<MessagingScreen.RecentDentistModel>()
                        list.clear()
                        _chatList.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }


    }


    init {
        getUUID()
    }


}