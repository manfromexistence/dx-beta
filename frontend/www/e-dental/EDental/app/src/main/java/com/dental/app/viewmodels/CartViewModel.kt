package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.models.CardModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CartViewModel : ViewModel() {

    private val user = FirebaseAuth.getInstance()
    private val uuid = user.currentUser!!.uid


    private val _cartList: MutableLiveData<ArrayList<CardModel>> = MutableLiveData()
    val cartList : LiveData<ArrayList<CardModel>> get() = _cartList

    private fun getItems() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = Firebase.firestore
            val categoryCollection = db.collection("cart").whereEqualTo("uuid",uuid)
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<CardModel>()
                        for (document in documents) {
                            val name = document.getString("name")
                            val description = document.getString("description")
                            val brand = document.getString("brand")
                            val price = document.getString("price")!!
                            val productPhoto = document.getString("productPhoto")!!
                            val quantity = document.getLong("quantity")!!
                            val address = document.getString("address")!!
                            val uuid = document.getString("uuid")!!

                            list.add(CardModel(name,description,brand,price,productPhoto,quantity,address,uuid))
                        }
                        _cartList.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<CardModel>()
                        list.clear()
                        _cartList.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

    init {
        getItems()
    }

}