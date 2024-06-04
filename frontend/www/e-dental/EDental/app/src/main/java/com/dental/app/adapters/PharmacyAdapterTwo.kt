package com.dental.app.adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.R
import com.dental.app.models.RatedProduct
import com.squareup.picasso.Picasso

class PharmacyAdapterTwo(private var list : ArrayList<RatedProduct>, private val textView: TextView,private val clickListener: OnItemClickListener) : RecyclerView.Adapter<PharmacyAdapterTwo.ViewHolder>() {

    private var intialQuantity : Int = 1

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage : ImageView = itemView.findViewById(R.id.productImg)
        val increaseQuantity : ImageView = itemView.findViewById(R.id.increaseQuantity)
        val decreaseQuantity : ImageView = itemView.findViewById(R.id.decreaseQuantity)
        val priceAccordingToQuantity : TextView = itemView.findViewById(R.id.textView19)
        val productTitle : TextView = itemView.findViewById(R.id.textView17)
        val price : TextView = itemView.findViewById(R.id.textView18)
        val card : CardView = itemView.findViewById(R.id.goodSample)
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PharmacyAdapterTwo.ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.popular_pharmacy_sample,parent,false)
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

    override fun onBindViewHolder(holder: PharmacyAdapterTwo.ViewHolder, position: Int) {
        val model = list[position]
        Picasso.get().load(model.url).into(holder.productImage)
        holder.productTitle.text = model.productName.toString()
        holder.card.setOnClickListener {
            clickListener.onItemClick(position)
        }
        holder.price.text = "${model.productPrice}тг"

        holder.priceAccordingToQuantity.text = intialQuantity.toString()

        holder.increaseQuantity.setOnClickListener {
            intialQuantity++
            holder.priceAccordingToQuantity.text = intialQuantity.toString()
            holder.price.text = "${model.productPrice!!.times(intialQuantity)}тг"
        }

        holder.decreaseQuantity.setOnClickListener {
            if (intialQuantity != 1){
                intialQuantity--
                holder.priceAccordingToQuantity.text = intialQuantity.toString()
                holder.price.text = "${model.productPrice!!.times(intialQuantity)}тг"
            } else {
                Log.d("counter_","counter goes below the 0")
            }
        }

    }

    override fun getItemCount(): Int = list.size


}