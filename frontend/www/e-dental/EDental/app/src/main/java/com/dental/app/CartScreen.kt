package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.dental.app.adapters.CartAdapter
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.databinding.ActivityCartScreenBinding
import com.dental.app.viewmodels.CartViewModel

class CartScreen : AppCompatActivity() {

    private lateinit var binding : ActivityCartScreenBinding
    private lateinit var viewModel : CartViewModel
    private lateinit var adapter : CartAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCartScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Товары в корзине"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[CartViewModel::class.java]


        viewModel.cartList.observe(this@CartScreen){ list ->
            if (list.isNotEmpty()){
                binding.progressBar2.visibility = View.GONE
                val manager = GridLayoutManager(this@CartScreen,2)
                adapter = CartAdapter(list,object : OnItemClickListener{
                    override fun onItemClick(position: Int) {
                       val item = list[position]

                       val intent = Intent(this@CartScreen,CartItemDetail::class.java)
                       intent.putExtra("name",item.name)
                       intent.putExtra("description",item.description)
                       intent.putExtra("price",item.price)
                       intent.putExtra("productPhoto",item.productPhoto)
                       intent.putExtra("quantity",item.quantity)
                       intent.putExtra("address",item.address)
                       intent.putExtra("uuid",item.uuid)

                       startActivity(intent)
                    }

                })
                binding.cardRec.layoutManager = manager
                binding.cardRec.adapter = adapter
            } else {
                binding.progressBar2.visibility = View.GONE
                binding.textView24.visibility = View.VISIBLE
            }

        }



    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}