package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import com.dental.app.databinding.ActivityCartItemDetailBinding
import com.dental.app.viewmodels.UserDetailViewModel
import com.squareup.picasso.Picasso
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class CartItemDetail : AppCompatActivity() {

    private lateinit var binding : ActivityCartItemDetailBinding
    private var uuid : String = ""
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCartItemDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)


        setSupportActionBar(binding.toolbar)
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        val data = intent.extras

        val name = data!!.getString("name","")
        val description = data.getString("description","")
        val price = data.getString("price","")
        val productPhoto = data.getString("productPhoto","")
        val quantity = data.getLong("quantity",0L)
        val address = data.getString("address","")
        uuid = data.getString("uuid","")

        binding.textView40.text = address
        supportActionBar?.title = name

        binding.detailLayout.parent.visibility = View.VISIBLE
        binding.detailLayout.productPrice.text = price.toString()
        Picasso.get().load(productPhoto).into(binding.detailLayout.imageView18)
        binding.detailLayout.productDescription.text = "Описание:\n \n$description"
        binding.detailLayout.textView21.text = name.toString()
        binding.detailLayout.textView21.visibility = View.GONE

        binding.detailLayout.imageView17.visibility = View.GONE
        binding.detailLayout.addToCart.visibility = View.GONE

        binding.detailLayout.fdsfs.text = "Количество:"
        binding.detailLayout.textView19.text = quantity.toString()

        binding.detailLayout.increaseQuantity.visibility = View.GONE
        binding.detailLayout.decreaseQuantity.visibility = View.GONE


    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.chat_with_doctor, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.chatWithDoctor -> {
                // Handle search action
                scope.launch {
                    val data = UserDetailViewModel()
                    data.getDentist(uuid)
                    data.dentistDetail.observe(this@CartItemDetail){
                        val intent = Intent(this@CartItemDetail,MessagingScreen::class.java)
                        intent.putExtra("name",it.name)
                        
                        intent.putExtra("surname",it.surname)
                        intent.putExtra("uuid",it.uuid)
                        startActivity(intent)
                    }

                }

                true
            }

            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}