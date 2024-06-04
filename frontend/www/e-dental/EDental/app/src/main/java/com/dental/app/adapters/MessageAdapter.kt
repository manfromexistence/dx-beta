package com.dental.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.models.ChatMessageModel
import com.google.firebase.auth.FirebaseAuth

class MessageAdapter(private val list : ArrayList<ChatMessageModel>) : RecyclerView.Adapter<MessageAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val myLinearLayout : LinearLayout = itemView.findViewById(R.id.rightChatLayout)
        val otherLinearLayout : LinearLayout = itemView.findViewById(R.id.leftChatLayout)
        val myMessage : TextView = itemView.findViewById(R.id.rightChatTextView)
        val otherMessage : TextView = itemView.findViewById(R.id.leftChatTextView)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.chat_message_row_sample,parent,false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val model = list[position]
        if (model.senderId.equals(FirebaseAuth.getInstance().currentUser!!.uid)){
           holder.otherLinearLayout.visibility = View.GONE
           holder.myLinearLayout.visibility = View.VISIBLE
           holder.myMessage.text = model.message
        }else {
            holder.myLinearLayout.visibility = View.GONE
            holder.otherLinearLayout.visibility = View.VISIBLE
            holder.otherMessage.text = model.message
        }
    }
}