package com.dental.e_dentaladmin.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.e_dentaladmin.models.ProductModel
import com.google.firebase.firestore.ktx.firestore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ProductViewModel : ViewModel() {

    private val _productList: MutableLiveData<ArrayList<ProductModel>> = MutableLiveData()
    val productList : LiveData<ArrayList<ProductModel>> get() = _productList


    private fun getProducts() {
        viewModelScope.launch(Dispatchers.IO) {
            val db = com.google.firebase.ktx.Firebase.firestore
            val categoryCollection = db.collection("products")
            categoryCollection.get()
                .addOnSuccessListener { documents ->
                    if (!documents.isEmpty) {
                        val list = ArrayList<ProductModel>()
                        for (document in documents) {
                            val name = document.getString("productName")
                            val description = document.getString("description")
                            val brand = document.getString("brand")
                            val price = document.getLong("productPrice")!!
                            val pID = document.getString("pID")!!
                            val img = document.getString("url")!!

                            list.add(ProductModel(name,description,brand,price,pID,img))
                        }
                        _productList.value = list
                    } else {
                        println("Error getting documents: No Document Found")
                        val list = ArrayList<ProductModel>()
                        list.clear()
                        _productList.value = list
                    }
                }
                .addOnFailureListener { exception ->
                    println("Error getting documents: $exception")
                }
        }

    }

    init {
        getProducts()
    }

}