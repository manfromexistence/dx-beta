package com.dental.app.ui

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.dental.app.adapters.ProductAdapter
import com.dental.app.databinding.FragmentProductBinding
import com.dental.app.models.ServiceModel
import com.dental.app.viewmodels.ServiceViewModel
import java.util.Locale


class ProductFragment : Fragment() {

    private var _binding : FragmentProductBinding? = null
    private lateinit var list : ArrayList<ServiceModel>
    private lateinit var adapter: ProductAdapter
    private lateinit var viewModel : ServiceViewModel
    private val filteredList = ArrayList<ServiceModel>()
    private val binding get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentProductBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[ServiceViewModel::class.java]


        list = ArrayList()
        adapter = ProductAdapter(list,binding.textView15,requireContext())
        binding.productRec.adapter = adapter
        binding.productRec.hasFixedSize()

        viewModel.services.observe(requireActivity()){
            list.addAll(it)
            adapter.onApplySearch(it)
        }

        binding.searchBar.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                // Filter the items when text changes
                filter(s.toString())
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                // No implementation needed
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                // No implementation needed
            }
        })

        return binding.root
    }

    private fun filter(text: String) {
        filteredList.clear()
        for (item in list) {
            if (item.serviceName!!.toLowerCase(Locale.ROOT).contains(text.toLowerCase(Locale.ROOT))) {
                filteredList.add(item)
            }
        }
        adapter.onApplySearch(filteredList)
    }


}