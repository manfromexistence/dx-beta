package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.dental.app.databinding.ActivityRestorePasswordBinding
import com.google.firebase.auth.FirebaseAuth

class RestorePassword : AppCompatActivity() {

    private lateinit var binding : ActivityRestorePasswordBinding
    private lateinit var user : FirebaseAuth


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRestorePasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()
        user = FirebaseAuth.getInstance()


        binding.materialButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE
            val email = binding.email.text.toString().trim()
            if (email.isNotEmpty()){
                sendPasswordResetEmail(email)
            } else {
                Toast.makeText(this@RestorePassword,"Please enter you registered email!",Toast.LENGTH_SHORT).show()
                binding.progressBar.visibility = View.GONE
            }
        }




    }

    private fun sendPasswordResetEmail(email: String) {
        user.sendPasswordResetEmail(email)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    // Password reset email sent successfully
                    Toast.makeText(this@RestorePassword,"Password reset mail sent successfully",
                        Toast.LENGTH_SHORT).show()

                    val intent = Intent(this, LoginScreen::class.java)
                    startActivity(intent)
                    finishAffinity()

                    binding.progressBar.visibility = View.GONE
                } else {
                    // Password reset failed
                    Toast.makeText(this@RestorePassword,"An error occurred!", Toast.LENGTH_SHORT).show()
                    binding.progressBar.visibility = View.GONE
                }
            }
    }

}