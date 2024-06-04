package com.dental.e_dentaladmin.adapters

import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.dental.e_dentaladmin.R
import com.dental.e_dentaladmin.models.ServiceModel

class ServiceAdapter(private var list: ArrayList<ServiceModel>, private val textView: TextView,
    private val clickListener: OnItemClickListener) : RecyclerView.Adapter<ServiceAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val title : TextView = itemView.findViewById(R.id.title)
        val des : TextView = itemView.findViewById(R.id.des)
        val doctorName : TextView = itemView.findViewById(R.id.textView38)
        val imageView : ImageView = itemView.findViewById(R.id.imageView13)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_sample_service,parent,false)
        return ViewHolder(view)
    }

    fun onApplySearch(filterlist: ArrayList<ServiceModel>) {
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
        holder.title.text = model.serviceName
        holder.doctorName.text = model.offeredBy
        holder.des.text = model.description

        holder.imageView.setOnClickListener {
            clickListener.onItemClick(position)
        }
    }
}