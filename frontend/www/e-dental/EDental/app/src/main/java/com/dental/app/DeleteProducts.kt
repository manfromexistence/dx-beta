package com.dental.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.dental.app.adapters.MyProductAdapter
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.databinding.ActivityDeleteProductsBinding
import com.dental.app.viewmodels.FirebaseSource
import com.dental.app.viewmodels.MyProductsViewModel
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob

class DeleteProducts : AppCompatActivity() {

    private lateinit var binding : ActivityDeleteProductsBinding

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : MyProductsViewModel
    private lateinit var adapter : MyProductAdapter
    private var fSource = FirebaseSource()
    private lateinit var user : FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDeleteProductsBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[MyProductsViewModel::class.java]
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Мои продукты"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)

        user = FirebaseAuth.getInstance()
        viewModel.getProducts(user.currentUser!!.uid)

        viewModel.productList.observe(this@DeleteProducts){ productList ->
            if (productList.isNotEmpty()){
                adapter = MyProductAdapter(productList,binding.textView6,object :OnItemClickListener {
                    override fun onItemClick(position: Int) {
                        val item = productList[position].url
                        fSource.deleteProduct(item!!)
                        productList.removeAt(position)
                        adapter.notifyDataSetChanged()
                        Toast.makeText(this@DeleteProducts,"Товар удален!", Toast.LENGTH_LONG).show()
                    }
                })
                val manager = GridLayoutManager(this@DeleteProducts,2)
                binding.podcastRecycler.layoutManager = manager
                binding.podcastRecycler.adapter = adapter
            }else {
                binding.textView6.visibility = View.VISIBLE
            }
        }


    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}