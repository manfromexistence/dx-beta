package com.dental.e_dentaladmin.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.dental.e_dentaladmin.AddProduct
import com.dental.e_dentaladmin.FirebaseSource
import com.dental.e_dentaladmin.adapters.OnItemClickListener
import com.dental.e_dentaladmin.adapters.ProductAdapter
import com.dental.e_dentaladmin.databinding.FragmentProductsBinding
import com.dental.e_dentaladmin.viewmodels.ProductViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob


class ProductsFragment : Fragment() {

    private var _binding : FragmentProductsBinding? = null
    private val binding get() = _binding!!

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : ProductViewModel
    private lateinit var adapter : ProductAdapter
    private var fSource = FirebaseSource()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentProductsBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[ProductViewModel::class.java]

        viewModel.productList.observe(requireActivity()){ productList ->
            if (productList.isNotEmpty()) {
                adapter = ProductAdapter(productList,binding.textView6,object :OnItemClickListener{
                    override fun onItemClick(position: Int) {
                        val item = productList[position].url
                        fSource.deleteProduct(item!!)
                        productList.removeAt(position)
                        adapter.notifyDataSetChanged()
                        Toast.makeText(requireContext(),"Товар удален!", Toast.LENGTH_LONG).show()
                    }
                })

                val manager = GridLayoutManager(requireContext(),2)
                binding.podcastRecycler.layoutManager = manager
                binding.podcastRecycler.adapter = adapter

            } else {
                 binding.textView6.visibility = View.VISIBLE
            }
        }


        binding.addProduct.setOnClickListener {
            startActivity(Intent(requireContext(),AddProduct::class.java))
        }


        return binding.root
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

}