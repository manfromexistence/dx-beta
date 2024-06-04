package com.dental.app.adapters

import android.content.Context
import android.content.Intent
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.ServiceSchedule
import com.dental.app.models.ServiceModel

class ProductAdapter(private var list: ArrayList<ServiceModel>, private val textView: TextView,private val context: Context) : RecyclerView.Adapter<ProductAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val title : TextView = itemView.findViewById(R.id.title)
        val des : TextView = itemView.findViewById(R.id.des)
        val doctorName : TextView = itemView.findViewById(R.id.textView38)
        val card : CardView = itemView.findViewById(R.id.item)
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

        holder.card.setOnClickListener {
            val intent = Intent(context, ServiceSchedule::class.java)
            intent.putExtra("offeredBy",model.offeredBy)
            intent.putExtra("price",model.price)
            intent.putExtra("description",model.description)
            intent.putExtra("serviceName",model.serviceName)
            context.startActivity(intent)
        }
    }
}