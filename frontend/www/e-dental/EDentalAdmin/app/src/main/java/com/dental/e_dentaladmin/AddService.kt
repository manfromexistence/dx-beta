package com.dental.e_dentaladmin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.dental.e_dentaladmin.databinding.ActivityAddServiceBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class AddService : AppCompatActivity() {

    private lateinit var binding : ActivityAddServiceBinding
    private lateinit var user : FirebaseAuth
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddServiceBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Добавить услугу"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        binding.addDentistServiceButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE

            scope.launch {
                val serviceName = binding.surname.text.toString().trim()
                val description = binding.name.text.toString().trim()
                val price = binding.experience.text.toString().trim()

                if (serviceName.isNotEmpty() && description.isNotEmpty() && price.isNotEmpty()){

                    val data = hashMapOf(
                        "serviceName" to serviceName,
                        "description" to description,
                        "price" to price.toInt(),
                        "offeredBy" to "Admin",
                    )

                    db.collection("services").document().set(data).addOnSuccessListener {
                        Toast.makeText(this@AddService,"Услуга стоматолога успешно добавлена", Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                        clearText()

                    }.addOnFailureListener {
                        Toast.makeText(this@AddService,it.localizedMessage, Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                    }
                }else {
                    Toast.makeText(this@AddService,"Пожалуйста, заполните все поля!", Toast.LENGTH_SHORT).show()
                    binding.progressBar.visibility = View.GONE
                }

            }
        }


    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }

    private fun clearText(){
        binding.name.text.clear()
        binding.surname.text.clear()
        binding.experience.text.clear()
    }
}