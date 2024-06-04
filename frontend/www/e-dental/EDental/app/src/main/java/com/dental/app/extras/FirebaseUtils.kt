package com.dental.app.extras

import android.annotation.SuppressLint
import android.icu.text.SimpleDateFormat
import android.os.Build
import androidx.annotation.RequiresApi
import com.google.firebase.Timestamp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.CollectionReference
import com.google.firebase.firestore.DocumentReference
import com.google.firebase.firestore.FirebaseFirestore

class FirebaseUtils {

    fun getChatRoomReference(chatroomId : String) : DocumentReference {
        return FirebaseFirestore.getInstance().collection("chatrooms").document(chatroomId)
    }

    fun getChatRoomMessageReference(chatroomId : String) : CollectionReference {
        return getChatRoomReference(chatroomId).collection("chats")
    }

    fun getChatRoomId(user1 : String, user2 : String) : String{
        return if (user1.hashCode()<user2.hashCode()){
            user1+"_"+user2
        }else {
            user2+"_"+user1
        }
    }

    private fun allUserCollectionReference(): CollectionReference {
        return FirebaseFirestore.getInstance().collection("users")
    }

    fun getOtherUserFromChatroom(userIds: List<String>): DocumentReference {
        return if (userIds[0] == FirebaseAuth.getInstance().currentUser!!.uid) {
            allUserCollectionReference().document(userIds[1])
        } else {
            allUserCollectionReference().document(userIds[0])
        }
    }

    fun currentUserDetails(): DocumentReference {
        return FirebaseFirestore.getInstance().collection("users").document(FirebaseAuth.getInstance().currentUser!!.uid)
    }

    fun otherUserDetails(uuid:String): DocumentReference {
        return FirebaseFirestore.getInstance().collection("tokens").document(uuid)
    }


    fun recentDentists(yourUUID:String,dentistUUID:String): DocumentReference {
        return FirebaseFirestore.getInstance().collection("recent_chats").document(yourUUID+dentistUUID)
    }

    @SuppressLint("SimpleDateFormat")
    @RequiresApi(Build.VERSION_CODES.N)
    fun timestampToString(timestamp: Timestamp): String? {
        return SimpleDateFormat("HH:MM").format(timestamp.toDate())
    }

}