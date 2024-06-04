package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.models.RatedProduct
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PharmacyViewModel : ViewModel() {

    private val _recOne: MutableLiveData<ArrayList<RatedProduct>> = MutableLiveData()
    val recOne : LiveData<ArrayList<RatedProduct>> get() = _recOne


    private fun getRecOneItems() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("products").limit(4)
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<RatedProduct>()
                        for (document in documents) {
                            val name = document.getString("productName")
                            val description = document.getString("description")
                            val brand = document.getString("brand")
                            val price = document.getLong("productPrice")!!
                            val pID = document.getString("pID")!!
                            val img = document.getString("url")!!

                            list.add(RatedProduct(name,description,brand,price,pID,img))
                        }
                        _recOne.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<RatedProduct>()
                        list.clear()
                        _recOne.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }




    private val _recTwo: MutableLiveData<ArrayList<RatedProduct>> = MutableLiveData()
    val recTwo : LiveData<ArrayList<RatedProduct>> get() = _recTwo


    private fun getRecTwoItems() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("products").limit(12)
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<RatedProduct>()
                        for (document in documents) {
                            val name = document.getString("productName")
                            val description = document.getString("description")
                            val brand = document.getString("brand")
                            val price = document.getLong("productPrice")!!
                            val pID = document.getString("pID")!!
                            val img = document.getString("url")!!

                            list.add(RatedProduct(name,description,brand,price,pID,img))
                        }
                        _recTwo.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<RatedProduct>()
                        list.clear()
                        _recTwo.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }


    init {
        getRecOneItems()
        getRecTwoItems()
    }


}