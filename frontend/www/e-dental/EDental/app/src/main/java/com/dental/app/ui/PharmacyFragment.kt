package com.dental.app.ui

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.dental.app.CartScreen
import com.dental.app.ProductDetailActivity
import com.dental.app.TopRatedPharmacy
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.adapters.PharmacyAdapterOne
import com.dental.app.adapters.PharmacyAdapterTwo
import com.dental.app.databinding.FragmentPharmacyBinding
import com.dental.app.models.RatedProduct
import com.dental.app.viewmodels.PharmacyViewModel
import kotlinx.coroutines.launch
import java.util.Locale


class PharmacyFragment : Fragment() {

    private var _binding : FragmentPharmacyBinding? = null
    private val binding get() = _binding!!

    private lateinit var goodList : ArrayList<RatedProduct>
    private lateinit var popularItemList : ArrayList<RatedProduct>

    private lateinit var goodProductAdapter : PharmacyAdapterOne
    private lateinit var ratedProductAdapter : PharmacyAdapterTwo
    private lateinit var viewModel : PharmacyViewModel

    private val goodFilteredList = ArrayList<RatedProduct>()
    private val ratedFilteredList = ArrayList<RatedProduct>()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentPharmacyBinding.inflate(layoutInflater,container,false)

        viewModel = ViewModelProvider(this)[PharmacyViewModel::class.java]

        goodList = ArrayList()
        popularItemList = ArrayList()

        goodProductAdapter = PharmacyAdapterOne(goodList,binding.noProductFoundText,object : OnItemClickListener{
            override fun onItemClick(position: Int) {
                val item = goodList[position]
                val productName = item.productName.toString()
                val productPrice = item.productPrice!!.toInt()
                val pID = item.pID.toString()
                val url = item.url.toString()
                val brand = item.brand.toString()
                val description = item.description.toString()

                val intent = Intent(requireActivity(),ProductDetailActivity::class.java)
                intent.putExtra("productName",productName)
                intent.putExtra("productPrice",productPrice)
                intent.putExtra("pID",pID)
                intent.putExtra("url",url)
                intent.putExtra("brand",brand)
                intent.putExtra("description",description)

                requireContext().startActivity(intent)
                Log.d("itemm",item.productPrice.toString())
            }

        })

        binding.goodRecycler.layoutManager = GridLayoutManager(requireContext(),2)
        binding.goodRecycler.adapter = goodProductAdapter
        binding.goodRecycler.hasFixedSize()

        viewModel.recOne.observe(requireActivity()){ recOne ->
            if (recOne.isNotEmpty()){
                goodList.addAll(recOne)
                goodProductAdapter.updateList(recOne)
            }else {
                binding.noProductFoundText.visibility = View.VISIBLE
            }
        }

        ratedProductAdapter = PharmacyAdapterTwo(popularItemList,binding.noRatedProductFoundText,object :OnItemClickListener{
            override fun onItemClick(position: Int) {
                val item = popularItemList[position]
                val productName = item.productName.toString()
                val productPrice = item.productPrice!!.toInt()
                val pID = item.pID.toString()
                val url = item.url.toString()
                val brand = item.brand.toString()
                val description = item.description.toString()

                val intent = Intent(requireActivity(),ProductDetailActivity::class.java)
                intent.putExtra("productName",productName)
                intent.putExtra("productPrice",productPrice)
                intent.putExtra("pID",pID)
                intent.putExtra("url",url)
                intent.putExtra("brand",brand)
                intent.putExtra("description",description)

                requireContext().startActivity(intent)
                Log.d("itemm",item.productPrice.toString())
            }

        })

        val linearLayout = LinearLayoutManager(requireContext(), RecyclerView.HORIZONTAL,false)
        binding.ratedRecycler.adapter = ratedProductAdapter
        binding.ratedRecycler.layoutManager = linearLayout
        binding.ratedRecycler.hasFixedSize()

        viewModel.recTwo.observe(requireActivity()){ recTwo ->
            if (recTwo.isNotEmpty()){
                popularItemList.addAll(recTwo)
                ratedProductAdapter.updateList(recTwo)
            }else {
                binding.noRatedProductFoundText.visibility = View.VISIBLE
            }
        }


        binding.searchBar.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                // Filter the items when text changes
                lifecycleScope.launch {
                    goodFilter(s.toString())
                    ratedFilter(s.toString())
                }
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                // No implementation needed
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                // No implementation needed
            }
        })

        binding.textView16.setOnClickListener {
            startActivity(Intent(requireContext(),TopRatedPharmacy::class.java))
        }

        binding.imageView16.setOnClickListener {
            startActivity(Intent(requireContext(), CartScreen::class.java))
        }



        return binding.root
    }

    private fun goodFilter(text: String) {
        goodFilteredList.clear()
        for (item in goodList) {
            if (item.productName.toString().toLowerCase(Locale.ROOT).contains(text.toLowerCase(Locale.ROOT))) {
                goodFilteredList.add(item)
            }
        }
        goodProductAdapter.updateList(goodFilteredList)
    }

    private fun ratedFilter(text: String) {
        ratedFilteredList.clear()
        for (item in popularItemList) {
            if (item.productName.toString().toLowerCase(Locale.ROOT).contains(text.toLowerCase(Locale.ROOT))) {
                ratedFilteredList.add(item)
            }
        }
        ratedProductAdapter.updateList(ratedFilteredList)
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

}