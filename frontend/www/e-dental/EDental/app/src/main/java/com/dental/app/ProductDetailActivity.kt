package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.dental.app.databinding.ActivityProductDetailBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.squareup.picasso.Picasso

class ProductDetailActivity : AppCompatActivity() {

    private lateinit var binding : ActivityProductDetailBinding
    private var initialQuantity : Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProductDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val data = intent.extras
        val productName = data!!.getString("productName")
        val productPrice = data.getInt("productPrice")
        val url = data.getString("url")
        val description = data.getString("description")
        val pID = data.getString("pID")
        val brand = data.getString("brand")


        binding.detailLayout.parent.visibility = View.VISIBLE
        binding.detailLayout.productPrice.text = productPrice.toString()
        Picasso.get().load(url).into(binding.detailLayout.imageView18)
        binding.detailLayout.productDescription.text = "Описание:\n \n${description.toString()}"
        binding.detailLayout.textView21.text = productName.toString()

        binding.detailLayout.increaseQuantity.setOnClickListener {
            initialQuantity++
            binding.detailLayout.textView19.text = initialQuantity.toString()
            binding.detailLayout.productPrice.text = "${productPrice!!.times(initialQuantity)}тг"
        }

        binding.detailLayout.decreaseQuantity.setOnClickListener {
            if (initialQuantity != 1){
                initialQuantity--
                binding.detailLayout.textView19.text = initialQuantity.toString()
                binding.detailLayout.productPrice.text = "${productPrice!!.times(initialQuantity)}тг"
            } else {
                Log.d("counter_","counter goes below the 0")
            }
        }

        binding.detailLayout.addToCart.setOnClickListener {
            val db = FirebaseFirestore.getInstance()


            val dialogView = layoutInflater.inflate(R.layout.address_dialog_box, null)
            val editText = dialogView.findViewById<EditText>(R.id.addressInput)

            AlertDialog.Builder(this@ProductDetailActivity)
                .setTitle("Введите свой адрес")
                .setView(dialogView)
                .setPositiveButton("Добавить на карту") { _, _ ->

                    val enteredText = editText.text.toString()
                    if (enteredText.isNotEmpty()){

                        val productInfo = hashMapOf(
                            "name" to productName.toString(),
                            "description" to description.toString(),
                            "brand" to brand.toString(),
                            "price" to productPrice.toString(),
                            "productPhoto" to url,
                            "quantity" to initialQuantity,
                            "uuid" to FirebaseAuth.getInstance().currentUser!!.uid,
                            "address" to enteredText
                        )
                        db.collection("cart").document().set(productInfo)
                            .addOnSuccessListener {
                                Toast.makeText(this,"Товар добавлен на карту", Toast.LENGTH_SHORT).show()
                                startActivity(Intent(this,MainActivity::class.java))
                                finishAffinity()
                            }.addOnFailureListener {
                                Toast.makeText(this,it.localizedMessage, Toast.LENGTH_SHORT).show()
                            }
                    } else {
                        Toast.makeText(this,"пожалуйста, введите свой адрес", Toast.LENGTH_SHORT).show()
                    }
                }
                .setNegativeButton("Отмена") { dialog, _ ->
                    dialog.dismiss()
                }
                .show()



        }

        binding.detailLayout.imageView17.setOnClickListener {
            finish()
        }

    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}