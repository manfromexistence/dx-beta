package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import com.dental.app.adapters.CompanyFilterAdapter
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.adapters.PharmacyAdapterTwo
import com.dental.app.databinding.ActivityTopRatedPharmacyBinding
import com.dental.app.models.RatedProduct
import com.dental.app.viewmodels.TopRatedViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.squareup.picasso.Picasso
import kotlinx.coroutines.launch
import java.util.Locale

class TopRatedPharmacy : AppCompatActivity() {

    private lateinit var binding : ActivityTopRatedPharmacyBinding

    private lateinit var viewModel : TopRatedViewModel

    private lateinit var popularItemList : ArrayList<RatedProduct>
    private lateinit var ratedProductAdapter : PharmacyAdapterTwo

    private  var companyNames = ArrayList<String>()
    private var isProductDetailLayoutShowing : Boolean = false
    private var isFilterOptionsShowing : Boolean = false
    private var initialQuantity : Int = 1

    private val popularFilterList = ArrayList<RatedProduct>()
    private lateinit var companyAdapter : CompanyFilterAdapter

    private lateinit var user : FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTopRatedPharmacyBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[TopRatedViewModel::class.java]

        popularItemList = ArrayList()
        user = FirebaseAuth.getInstance()

        viewModel.recOne.observe(this@TopRatedPharmacy){ list ->
            popularItemList.addAll(list)

            for (companies in list){
                companyNames.add(companies.brand.toString())
            }

            companyAdapter = CompanyFilterAdapter(companyNames,object :OnItemClickListener{
                override fun onItemClick(position: Int) {
                    val item = companyNames[position]
                    filterByCompany(item)
                }
            })

            val companyRecLayout = GridLayoutManager(this@TopRatedPharmacy,3)
            binding.brandNameRecycler.adapter = companyAdapter
            binding.brandNameRecycler.layoutManager = companyRecLayout
            binding.brandNameRecycler.hasFixedSize()


            ratedProductAdapter = PharmacyAdapterTwo(list,binding.textView23,object :
                OnItemClickListener {
                override fun onItemClick(position: Int) {
                    val item = popularItemList[position]

                    if (!isProductDetailLayoutShowing){

                        lifecycleScope.launch {
                            binding.topRatedProductRec.visibility = View.GONE
                            binding.constraintLayout4.visibility = View.GONE
                            binding.filters.visibility = View.GONE
                            binding.productDetail.parent.visibility = View.VISIBLE

                            binding.productDetail.textView21.text = item.productName.toString()
                            binding.productDetail.productDescription.text = "Описание:\n \n${item.description.toString()}"
                            binding.productDetail.productPrice.text = item.productPrice.toString()
                            Picasso.get().load(item.url).into(binding.productDetail.imageView18)

                            binding.productDetail.increaseQuantity.setOnClickListener {
                                initialQuantity++
                                binding.productDetail.textView19.text = initialQuantity.toString()
                                binding.productDetail.productPrice.text = "${item.productPrice!!.times(initialQuantity)}тг"
                            }

                            binding.productDetail.decreaseQuantity.setOnClickListener {
                                if (initialQuantity != 1){
                                    initialQuantity--
                                    binding.productDetail.textView19.text = initialQuantity.toString()
                                    binding.productDetail.productPrice.text = "${item.productPrice!!.times(initialQuantity)}тг"
                                } else {
                                    Log.d("counter_","counter goes below the 0")
                                }
                            }


                            binding.productDetail.imageView17.setOnClickListener {
                                binding.productDetail.parent.visibility = View.GONE
                                binding.topRatedProductRec.visibility = View.VISIBLE
                                binding.constraintLayout4.visibility = View.GONE
                                binding.filters.visibility = View.VISIBLE
                                isProductDetailLayoutShowing = false
                            }

                            binding.productDetail.addToCart.setOnClickListener {
                                val db = FirebaseFirestore.getInstance()
                                val data = hashMapOf(
                                    "name" to item.productName.toString(),
                                    "description" to item.description.toString(),
                                    "brand" to item.brand.toString(),
                                    "price" to item.productPrice.toString(),
                                    "productPhoto" to item.url,
                                    "quantity" to initialQuantity,
                                    "uuid" to user.currentUser!!.uid
                                )
                                db.collection("cart").document().set(data)
                                    .addOnSuccessListener {
                                        Toast.makeText(this@TopRatedPharmacy,"Товар добавлен на карту",Toast.LENGTH_SHORT).show()
                                        startActivity(Intent(this@TopRatedPharmacy,MainActivity::class.java))
                                        finishAffinity()
                                    }.addOnFailureListener {
                                        Toast.makeText(this@TopRatedPharmacy,it.localizedMessage,Toast.LENGTH_SHORT).show()
                                    }
                            }

                            isProductDetailLayoutShowing = true
                        }
                    }


                }

            })

            val linearLayout = GridLayoutManager(this@TopRatedPharmacy,2)
            binding.topRatedProductRec.adapter = ratedProductAdapter
            binding.topRatedProductRec.layoutManager = linearLayout
            binding.topRatedProductRec.hasFixedSize()
        }

        binding.productDetail.parent.visibility = View.GONE
        binding.constraintLayout4.visibility = View.GONE

        binding.searchBar.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                // Filter the items when text changes
                if (isProductDetailLayoutShowing){
                    binding.topRatedProductRec.visibility = View.VISIBLE
                    binding.constraintLayout4.visibility = View.GONE
                    binding.productDetail.parent.visibility =View.GONE

                    isFilterOptionsShowing = false
                    isProductDetailLayoutShowing = false
                }

                if (isFilterOptionsShowing){
                    binding.constraintLayout4.visibility = View.GONE
                    isFilterOptionsShowing = false
                }

                lifecycleScope.launch {
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


        binding.filters.setOnClickListener {
            if (!isFilterOptionsShowing) {
                binding.constraintLayout4.visibility = View.VISIBLE
                isFilterOptionsShowing = true

                binding.startingPrice.addTextChangedListener(object : TextWatcher {
                    override fun afterTextChanged(s: Editable?) {
                        try {
                            filterStartToEnd(s.toString().toInt(),binding.endPrice.text.toString().toInt())
                        } catch (e : NumberFormatException){
                            e.printStackTrace()
                        }
                    }

                    override fun beforeTextChanged(
                        s: CharSequence?,
                        start: Int,
                        count: Int,
                        after: Int
                    ) {
                        // No implementation needed
                    }

                    override fun onTextChanged(
                        s: CharSequence?,
                        start: Int,
                        before: Int,
                        count: Int
                    ) {
                        // No implementation needed
                    }
                })

                binding.endPrice.addTextChangedListener(object : TextWatcher {


                    override fun afterTextChanged(s: Editable?) {
                        try {
                            filterStartToEnd(binding.startingPrice.text.toString().toInt(),s.toString().toInt())
                            if (s.toString().isEmpty()){
                               ratedProductAdapter.updateList(popularItemList)
                            }
                        } catch (e : NumberFormatException){
                            e.printStackTrace()
                        }
                    }


                    override fun beforeTextChanged(
                        s: CharSequence?,
                        start: Int,
                        count: Int,
                        after: Int
                    ) {
                        // No implementation needed
                    }

                    override fun onTextChanged(
                        s: CharSequence?,
                        start: Int,
                        before: Int,
                        count: Int
                    ) {
                        // No implementation needed
                    }
                })

            } else {
                binding.constraintLayout4.visibility = View.GONE
                ratedProductAdapter.updateList(popularItemList)
                isFilterOptionsShowing = false
            }
        }


        binding.imageView16.setOnClickListener {
            startActivity(Intent(this@TopRatedPharmacy,CartScreen::class.java))
        }


    }

    private fun ratedFilter(text: String) {
        popularFilterList.clear()
        for (item in popularItemList) {
            if (item.productName.toString().toLowerCase(Locale.ROOT).contains(text.toLowerCase(Locale.ROOT))) {
                popularFilterList.add(item)
            }
        }
        ratedProductAdapter.updateList(popularFilterList)
    }

    private fun filterFromStartingPoint(startingPrice: Int) {
        popularFilterList.clear()
        for (item in popularItemList) {
            if (item.productPrice!! >= startingPrice) {
                popularFilterList.add(item)
            }
        }
        ratedProductAdapter.updateList(popularFilterList)
    }

    private fun filterFromEndPoint(endPrice: Int) {
        popularFilterList.clear()
        for (item in popularItemList) {
            if (item.productPrice!! <= endPrice) {
                popularFilterList.add(item)
            }
        }
        ratedProductAdapter.updateList(popularFilterList)
    }

    private fun filterStartToEnd(startingPrice:Int,endPrice: Int) {
        popularFilterList.clear()
        for (item in popularItemList) {
            if (item.productPrice!! in startingPrice..endPrice) {
                popularFilterList.add(item)
            }
        }
        ratedProductAdapter.updateList(popularFilterList)
    }

    private fun filterByCompany(companyName : String) {
        popularFilterList.clear()
        for (item in popularItemList) {
            if (item.brand.toString().lowercase().contains(companyName.lowercase())) {
                popularFilterList.add(item)
            }
        }
        ratedProductAdapter.updateList(popularFilterList)
    }
}