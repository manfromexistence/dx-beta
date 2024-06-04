package com.dental.app.adapters

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.DentistDetailActivity
import com.dental.app.R
import com.dental.app.models.DoctorListModel
import com.google.firebase.auth.FirebaseAuth

class DoctorListAdapter(private var list : ArrayList<DoctorListModel>
  ,private val context:Context,private val textView: TextView) : RecyclerView.Adapter<DoctorListAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
       val doctorName : TextView = itemView.findViewById(R.id.doctorName)
       val experience : TextView = itemView.findViewById(R.id.experienceText)
       val card : CardView = itemView.findViewById(R.id.cardLayout)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.dentist_adapter_sample,parent,false)
        return ViewHolder(view)
    }

    fun updateList(list : ArrayList<DoctorListModel>){
        this.list = list
        if (list.isEmpty()){
            textView.visibility = View.VISIBLE
            notifyDataSetChanged()
        } else {
            textView.visibility = View.GONE
            notifyDataSetChanged()
        }
    }
    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val model = list[position]
        holder.doctorName.text = "${model.name} ${model.surname}"
        holder.experience.text = "${model.experience} лет"

        if (model.uuid == FirebaseAuth.getInstance().currentUser!!.uid){
            holder.doctorName.text = "${model.name} ${model.surname} (Me)"
        }

        holder.card.setOnClickListener {
           val intent = Intent(context,DentistDetailActivity::class.java)
           intent.putExtra("achievement",model.achievement)
           intent.putExtra("certificate",model.certificate)
           intent.putExtra("diploma",model.diploma)
           intent.putExtra("dob",model.dob)
           intent.putExtra("experience",model.experience)
           intent.putExtra("name",model.name)
           intent.putExtra("surname",model.surname)
           intent.putExtra("uuid",model.uuid)
           context.startActivity(intent)
        }
    }
}