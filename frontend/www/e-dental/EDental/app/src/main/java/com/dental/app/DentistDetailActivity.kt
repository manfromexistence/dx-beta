package com.dental.app

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.annotation.RequiresApi
import com.dental.app.databinding.ActivityDentistDetailBinding

class DentistDetailActivity : AppCompatActivity() {
    private lateinit var binding : ActivityDentistDetailBinding
    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDentistDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val data = intent.extras
        val acheivement = data!!.getString("achievement","")
        val certificate = data.getString("certificate","")
        val diploma = data.getString("diploma","")
        val dob = data.getString("dob","")
        val experience = data.getString("experience","")
        val name = data.getString("name","")
        val surname = data.getString("surname","")
        val uuid = data.getString("uuid","")



        binding.textView26.text = "$name $surname"
        binding.textView27.text = "Опыт работы:\n$experience лет"
        binding.acheivement.text = acheivement

        binding.backButton.setOnClickListener {
            finish()
        }


        binding.bookSession.setOnClickListener {
            val intent = Intent(this,ScheduleSession::class.java)
            intent.putExtra("achievement",acheivement)
            intent.putExtra("certificate",certificate)
            intent.putExtra("diploma",diploma)
            intent.putExtra("dob",dob)
            intent.putExtra("experience",experience)
            intent.putExtra("name",name)
            intent.putExtra("surname",surname)
            intent.putExtra("uuid",uuid)
            startActivity(intent)
        }


    }
}