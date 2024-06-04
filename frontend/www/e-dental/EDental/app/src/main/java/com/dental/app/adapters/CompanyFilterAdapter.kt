package com.dental.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R

class CompanyFilterAdapter(private val list : ArrayList<String>,private val clickListener: OnItemClickListener)
    : RecyclerView.Adapter<CompanyFilterAdapter.ViewHolder>() {


    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val layout : ConstraintLayout = itemView.findViewById(R.id.layout)
        val title : TextView = itemView.findViewById(R.id.companyName)
    }
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): CompanyFilterAdapter.ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.filter_company_sample,parent,false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: CompanyFilterAdapter.ViewHolder, position: Int) {
        val model = list[position]
        holder.title.text = model

        holder.layout.setOnClickListener {
            clickListener.onItemClick(position)
        }
    }

    override fun getItemCount(): Int = list.size

}