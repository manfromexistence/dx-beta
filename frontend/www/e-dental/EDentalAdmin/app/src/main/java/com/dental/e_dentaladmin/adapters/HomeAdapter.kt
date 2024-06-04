package com.dental.e_dentaladmin.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.dental.e_dentaladmin.R
import com.dental.e_dentaladmin.models.DoctorListModel

class HomeAdapter(private var list: ArrayList<DoctorListModel>, private val textView: TextView, private val onItemClickListener: OnItemClickListener)
    : RecyclerView.Adapter<HomeAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val doctorName : TextView = itemView.findViewById(R.id.doctorName)
        val experience : TextView = itemView.findViewById(R.id.experienceText)
        val card : ImageView = itemView.findViewById(R.id.deleteUser)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.category_sample,parent,false)
        return ViewHolder(view)
    }

    fun updateList(newList : ArrayList<DoctorListModel>){
        this.list = newList
        if (newList.isEmpty()){
            textView.visibility = View.VISIBLE
            notifyDataSetChanged()
        } else {
            textView.visibility = View.GONE
            notifyDataSetChanged()
        }
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val data = list[position]

        holder.doctorName.text = "${data.name} ${data.surname}"

        holder.experience.text = "${data.experience} лет"

        holder.card.setOnClickListener {
            onItemClickListener.onItemClick(position)
        }
    }
}