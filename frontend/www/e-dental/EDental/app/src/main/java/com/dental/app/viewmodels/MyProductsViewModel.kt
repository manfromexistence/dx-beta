package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.models.RatedProduct
import com.google.firebase.firestore.ktx.firestore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MyProductsViewModel : ViewModel() {

    private val _productList: MutableLiveData<ArrayList<RatedProduct>> = MutableLiveData()
    val productList : LiveData<ArrayList<RatedProduct>> get() = _productList


    fun getProducts(uuid : String) {
        viewModelScope.launch(Dispatchers.IO) {
            val db = com.google.firebase.ktx.Firebase.firestore
            val categoryCollection = db.collection("products").whereEqualTo("uuid",uuid)
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
                        _productList.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<RatedProduct>()
                        list.clear()
                        _productList.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

}