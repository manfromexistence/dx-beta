package com.dental.e_dentaladmin

import android.util.Log
import com.google.firebase.firestore.FirebaseFirestore

class FirebaseSource {

    fun deleteDoctor(uuid : String) {
        val firestore = FirebaseFirestore.getInstance()
        val collectionRef = firestore.collection("dentists")

        collectionRef.whereEqualTo("uuid",uuid).get()
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

    fun deleteService(name : String) {
        val firestore = FirebaseFirestore.getInstance()
        val collectionRef = firestore.collection("services")

        collectionRef.whereEqualTo("serviceName",name).get()
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