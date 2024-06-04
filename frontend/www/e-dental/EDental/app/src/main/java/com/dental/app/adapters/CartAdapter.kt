package com.dental.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.models.CardModel
import com.squareup.picasso.Picasso

class CartAdapter(private var list : ArrayList<CardModel>,private val onItemClickListener: OnItemClickListener) : RecyclerView.Adapter<CartAdapter.ViewHolder>() {


    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage : ImageView = itemView.findViewById(R.id.productImg)
        val increaseQuantity : ImageView = itemView.findViewById(R.id.increaseQuantity)
        val decreaseQuantity : ImageView = itemView.findViewById(R.id.decreaseQuantity)
        val priceAccordingToQuantity : TextView = itemView.findViewById(R.id.textView19)
        val productTitle : TextView = itemView.findViewById(R.id.textView17)
        val price : TextView = itemView.findViewById(R.id.textView18)
        val card : CardView = itemView.findViewById(R.id.goodSample)
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartAdapter.ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.popular_pharmacy_sample_two, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: CartAdapter.ViewHolder, position: Int) {
        val model = list[position]
        Picasso.get().load(model.productPhoto).into(holder.productImage)
        holder.productTitle.text = model.name.toString()

        holder.increaseQuantity.visibility = View.GONE
        holder.decreaseQuantity.visibility = View.GONE

        holder.priceAccordingToQuantity.text = "Кол-тво: ${model.quantity}     "

        holder.price.text = "${model.price}тг"

        holder.card.setOnClickListener {
            onItemClickListener.onItemClick(position)
        }

    }

    override fun getItemCount(): Int = list.size


}