package com.dental.app.viewmodels

import android.util.Log
import com.google.firebase.firestore.FirebaseFirestore

class FirebaseSource {

    fun deleteProduct(url : String) {
        val firestore = FirebaseFirestore.getInstance()
        val collectionRef = firestore.collection("products")

        collectionRef.whereEqualTo("url",url).get()
            .addOnSuccessListener {
                for (document in it) {
                    // Delete the document
                    collectionRef.document(document.id)
                        .delete()
                        .addOnSuccessListener {
                            println("Document successfully deleted")
                        }
                        .addOnFailureListener { exception ->
                            println("Error deleting document: $exception")
                        }
                }
            }.addOnFailureListener { e ->
                Log.d("Firebase",e.localizedMessage!!.toString())
            }
    }
}