package com.dental.app

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.dental.app.databinding.ActivitySigninBinding
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class SigninActivity : AppCompatActivity() {

    private lateinit var binding : ActivitySigninBinding
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var user: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySigninBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()

        user = FirebaseAuth.getInstance()

        binding.textView3.setOnClickListener {
            startActivity(Intent(this@SigninActivity,RestorePassword::class.java))
        }

        binding.materialButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE
            val email = binding.editTextTextEmailAddress.text.toString()
            val pass = binding.editPassword.text.toString()
            if (email.isNotEmpty() && pass.isNotEmpty()){
                loginProcess(email,pass)
            }else {
                Toast.makeText(this@SigninActivity,"Please fill all the details!", Toast.LENGTH_SHORT).show()
                binding.progressBar.visibility = View.GONE
            }
        }

    }

    private fun loginProcess(email:String,pass:String) {
        scope.launch {
            user.signInWithEmailAndPassword(email,pass).addOnSuccessListener {
                storeLogin()
                startActivity(Intent(this@SigninActivity,MainActivity::class.java))
                binding.progressBar.visibility = View.GONE
                finishAffinity()
            }.addOnFailureListener {
                Log.d("authentication",it.message.toString())
                Toast.makeText(this@SigninActivity,it.localizedMessage!!.toString(), Toast.LENGTH_SHORT).show()
                binding.progressBar.visibility = View.GONE
            }
        }
    }

    private fun storeLogin() {
        val sharedPreferences = getSharedPreferences("Login", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putBoolean("isLogin", true)
        editor.apply()
    }

}