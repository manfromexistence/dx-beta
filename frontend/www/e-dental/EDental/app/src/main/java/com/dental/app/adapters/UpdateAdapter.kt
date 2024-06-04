package com.dental.app.adapters

import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.ConfirmServiceSchedule
import com.dental.app.R

class UpdateAdapter(private var list: ArrayList<ConfirmServiceSchedule.UpdateModel>, private val textView: TextView) : RecyclerView.Adapter<UpdateAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val title : TextView = itemView.findViewById(R.id.title)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.update_sample,parent,false)
        return ViewHolder(view)
    }

    fun onApplySearch(filterlist: ArrayList<ConfirmServiceSchedule.UpdateModel>) {
        this.list = filterlist
        if (filterlist.isEmpty()){
            textView.visibility = View.VISIBLE
            notifyDataSetChanged()
        } else {
            notifyDataSetChanged()
            textView.visibility = View.GONE
        }

    }

    override fun getItemCount(): Int = list.size

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val model = list[position]

        if (model.updateType == "consultant"){
            holder.title.text = "Привет, ${model.patientName}! Ваша встреча с ${model.dentistName} запланирована на ${model.date} в ${model.time}. Благодарим вас за выбор компании «Е-Дентал»"
        } else {
            holder.title.text = "Привет, ${model.patientName}! Ваша встреча с ${model.dentistName} назначена на ${model.date} в ${model.time}. Благодарим вас за выбор компании «Е-Дентал»"
        }
    }
}