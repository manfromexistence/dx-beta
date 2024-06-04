package com.dental.e_dentaladmin.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.dental.e_dentaladmin.R
import com.dental.e_dentaladmin.models.ProductModel
import com.squareup.picasso.Picasso

class ProductAdapter(private var list : ArrayList<ProductModel>, private val textView:
TextView, private val clickListener: OnItemClickListener) : RecyclerView.Adapter<ProductAdapter.ViewHolder>() {


    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage : ImageView = itemView.findViewById(R.id.productImg)
        val productTitle : TextView = itemView.findViewById(R.id.productName)
        val delete : ImageView = itemView.findViewById(R.id.deleteProduct)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductAdapter.ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_sample,parent,false)
        return ViewHolder(view)
    }

    fun updateList(list : ArrayList<ProductModel>){
        this.list = list
        if (list.isEmpty()){
            textView.visibility = View.VISIBLE
            notifyDataSetChanged()
        } else {
            textView.visibility = View.GONE
            notifyDataSetChanged()
        }
    }

    override fun onBindViewHolder(holder: ProductAdapter.ViewHolder, position: Int) {
       val model = list[position]
        Picasso.get().load(model.url).into(holder.productImage)

        holder.productTitle.text = model.productName.toString()

       holder.delete.setOnClickListener {
           clickListener.onItemClick(position)
       }
    }

    override fun getItemCount(): Int = list.size
}