package com.dental.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.models.RatedProduct
import com.squareup.picasso.Picasso

class MyProductAdapter(private var list : ArrayList<RatedProduct>, private val textView:
TextView, private val clickListener: OnItemClickListener) : RecyclerView.Adapter<MyProductAdapter.ViewHolder>() {


    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage : ImageView = itemView.findViewById(R.id.productImg)
        val productTitle : TextView = itemView.findViewById(R.id.productName)
        val delete : ImageView = itemView.findViewById(R.id.deleteProduct)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyProductAdapter.ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.my_product_sample,parent,false)
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

    override fun onBindViewHolder(holder: MyProductAdapter.ViewHolder, position: Int) {
       val model = list[position]
        Picasso.get().load(model.url).into(holder.productImage)

        holder.productTitle.text = model.productName.toString()

       holder.delete.setOnClickListener {
           clickListener.onItemClick(position)
       }
    }

    override fun getItemCount(): Int = list.size
}