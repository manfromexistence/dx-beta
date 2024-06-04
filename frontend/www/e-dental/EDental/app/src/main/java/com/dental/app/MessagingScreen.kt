package com.dental.app

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView.AdapterDataObserver
import com.dental.app.adapters.ChatRecyclerAdapter
import com.dental.app.databinding.ActivityMessagingScreenBinding
import com.dental.app.extras.FirebaseUtils
import com.dental.app.models.ChatMessageModel
import com.dental.app.models.ChatRoomModel
import com.dental.app.models.UserModel
import com.dental.app.viewmodels.MessagingViewModel
import com.dental.app.viewmodels.ServiceViewModel
import com.firebase.ui.firestore.FirestoreRecyclerOptions
import com.google.firebase.Firebase
import com.google.firebase.Timestamp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.firestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException


class MessagingScreen : AppCompatActivity() {

    private lateinit var binding : ActivityMessagingScreenBinding
    private var chatRoomId : String = ""
    private var otherPersonUUID : String = ""
    private lateinit var adapter : ChatRecyclerAdapter
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : MessagingViewModel
    private val auth = FirebaseAuth.getInstance()
    private val myUUID : String = auth.currentUser!!.uid

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMessagingScreenBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[MessagingViewModel::class.java]
        setContentView(binding.root)

        val data = intent.extras
        val otherPersonName = data!!.getString("name")
        val otherPersonSurname = data.getString("surname")
        otherPersonUUID = data.getString("uuid")!!

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "$otherPersonName"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        chatRoomId = FirebaseUtils().getChatRoomId(myUUID, otherPersonUUID)

        getOrCreateChatRoom()
        viewModel.getOtherUserDetails(otherPersonUUID)

        binding.imageView15.setOnClickListener {
            val message = binding.searchBar.text.toString().trim()
            if (message.isEmpty()){
                return@setOnClickListener
            }
            binding.searchBar.text.clear()
            sendMessageToUser(message)
            FirebaseUtils().currentUserDetails().get().addOnCompleteListener { task->
                if (task.isSuccessful){
                    val currentUser: ConfirmSchedule.UserDetails? = task.result.toObject(ConfirmSchedule.UserDetails::class.java)

                    viewModel.otherUser.observe(this@MessagingScreen){
                        if (it.token != ""){
                            Log.d("NO TOKEN",it.token!!)
                            Log.d("NO TOKEN",currentUser!!.name)
                            sendNotification(it.token,"${currentUser.name} ${currentUser.surname}",message)
                        } else {
                          Log.d("NO TOKEN", it.token)
                        }
                    }
                }
            }
        }


        setUpChatAdapter()

    }

    private fun setUpChatAdapter() {
        val query = FirebaseUtils().getChatRoomMessageReference(chatRoomId)
            .orderBy("timestamp",Query.Direction.DESCENDING)


        val options = FirestoreRecyclerOptions.Builder<ChatMessageModel>()
            .setQuery(query, ChatMessageModel::class.java).build()

        adapter = ChatRecyclerAdapter(options, applicationContext)
        val manager = LinearLayoutManager(this)
        manager.reverseLayout = true
        binding.messageRec.layoutManager = manager
        binding.messageRec.adapter = adapter
        adapter.registerAdapterDataObserver(object : AdapterDataObserver() {
            override fun onItemRangeInserted(positionStart: Int, itemCount: Int) {
                super.onItemRangeInserted(positionStart, itemCount)
                binding.messageRec.smoothScrollToPosition(0)
            }
        })
        adapter.startListening()
    }

    private fun sendMessageToUser(message:String) {

        val chatRoomModel = ChatRoomModel(chatRoomId, listOf(myUUID,otherPersonUUID),Timestamp.now(),myUUID)
        FirebaseUtils().getChatRoomReference(chatRoomId).set(chatRoomModel)
        val chatMessageModel = ChatMessageModel(message,FirebaseAuth.getInstance().currentUser!!.uid,Timestamp.now())
        FirebaseUtils().getChatRoomMessageReference(chatRoomId).add(chatMessageModel).addOnCompleteListener {
            if (it.isSuccessful){
                scope.launch {
                    val recentModel = RecentDentistModel(myUUID,otherPersonUUID)
                    createRecentChat(recentModel)
                }
            }
        }
    }

    private fun getOrCreateChatRoom(){
       scope.launch {
           FirebaseUtils().getChatRoomReference(chatRoomId).get().addOnCompleteListener { task ->
               if (task.isSuccessful){
                   var chatRoomModel = task.result.toObject(ChatRoomModel::class.java)
                   if (chatRoomModel==null){
                       chatRoomModel = ChatRoomModel(chatRoomId,
                           listOf(FirebaseAuth.getInstance().currentUser!!.uid,otherPersonUUID),
                           Timestamp.now(),"")

                       FirebaseUtils().getChatRoomReference(chatRoomId).set(chatRoomModel)
                   }
               }
           }
       }
    }


    private fun createRecentChat(dentistModel: RecentDentistModel) {
        scope.launch {
            FirebaseUtils().recentDentists(dentistModel.yourUUID!!,dentistModel.dentist!!).get().addOnCompleteListener { task ->
                if (task.isSuccessful){
                    var recentModel = task.result.toObject(RecentDentistModel::class.java)
                    if (recentModel == null){
                        recentModel = RecentDentistModel(dentistModel.yourUUID,dentistModel.dentist)
                    }
                    FirebaseUtils().recentDentists(dentistModel.yourUUID,dentistModel.dentist).set(recentModel)
                }
            }
        }
    }


    private fun sendNotification(token: String, title: String, message: String) {
        val client = OkHttpClient()

        val json = JSONObject()
        json.put("to", token)
        val notificationObj = JSONObject()
        notificationObj.put("title", title)
        notificationObj.put("body", message)
        json.put("notification", notificationObj)

        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toString().toRequestBody(mediaType)

        val request = Request.Builder()
            .url("https://fcm.googleapis.com/fcm/send")
            .post(body)
            .addHeader("Authorization", "Bearer AAAAMDzLZ6A:APA91bFLhBQ8OCQCql0x7W1_y285ZgrkNMhXVdzMS1yQZ6-obE6CkagwJo3mf4y-oWhLi5iFEpjB8kown8NCSlYCJtSEzNzX418lm2PleooyYsxX-Bo0LgsvDuLB-XCHpiFHRdpnu8_2")  // Replace with your server key
            .addHeader("Content-Type", "application/json")
            .build()

        client.newCall(request).enqueue(object : okhttp3.Callback {
            override fun onFailure(call: okhttp3.Call, e: IOException) {
                Log.e("FCM", "Failed to send notification", e)
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                val responseBody = response.body?.string()
                Log.d("FCM", "Notification sent: $responseBody")
            }
        })
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }

    data class RecentDentistModel(
        val yourUUID : String? = "",
        val dentist : String? = ""
    )

    data class FCMToken(
        val uuid : String? = "",
        val token : String? = ""
    )
}