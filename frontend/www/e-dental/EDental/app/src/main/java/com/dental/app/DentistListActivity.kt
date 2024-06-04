package com.dental.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dental.app.databinding.ActivityDentistListBinding

class DentistListActivity : AppCompatActivity() {

    private lateinit var binding : ActivityDentistListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDentistListBinding.inflate(layoutInflater)
        setContentView(binding.root)





        
    }
}