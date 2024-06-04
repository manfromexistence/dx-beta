package com.dental.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.models.RatedProduct
import com.squareup.picasso.Picasso

class PharmacyAdapterOne(private var list : ArrayList<RatedProduct>, private val textView: TextView, private val clickListener: OnItemClickListener) : RecyclerView.Adapter<PharmacyAdapterOne.ViewHolder>() {


    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage : ImageView = itemView.findViewById(R.id.productImg)
        val productTitle : TextView = itemView.findViewById(R.id.productName)
        val card : ConstraintLayout = itemView.findViewById(R.id.goodSample)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PharmacyAdapterOne.ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.pharmacy_good_sample,parent,false)
        return ViewHolder(view)
    }

    fun updateList(list : ArrayList<RatedProduct>){
        this.list = list
        if (list.isEmpty()){
            textView.visibility = View.VISIBLE
            notifyDataSetChanged()
        } else {
            textView.visibility = View.GONE
            notifyDataSetChanged()
        }
    }

    override fun onBindViewHolder(holder: PharmacyAdapterOne.ViewHolder, position: Int) {
       val model = list[position]
        Picasso.get().load(model.url).into(holder.productImage)
       holder.productTitle.text = model.productName.toString()
       holder.card.setOnClickListener {
           clickListener.onItemClick(position)
       }
    }

    override fun getItemCount(): Int = list.size
}