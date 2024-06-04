package com.dental.e_dentaladmin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.dental.e_dentaladmin.databinding.ActivityMainBinding
import com.dental.e_dentaladmin.ui.HomeFragment
import com.dental.e_dentaladmin.ui.ProductsFragment
import com.dental.e_dentaladmin.ui.ServiceFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding
    private lateinit var home : Fragment
    private val fragmentManager = supportFragmentManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        home = HomeFragment()

        fragmentManager.beginTransaction().replace(R.id.frameLayout,home).commit()

        binding.navView.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.home -> {
                    val home = HomeFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, home).commit()
                }
                R.id.products -> {
                    val recording = ProductsFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
                }
                R.id.services -> {
                    val services = ServiceFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout,services).commit()
                }
                else -> return@setOnNavigationItemSelectedListener false
            }
            true
        }


    }
}