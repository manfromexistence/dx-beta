package com.dental.app

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.viewpager.widget.ViewPager
import com.dental.app.adapters.AddFragmentsAdapter
import com.dental.app.adddata.AddDentistFragment
import com.dental.app.adddata.AddDentistServiceFragment
import com.dental.app.adddata.AddProductFragment
import com.dental.app.databinding.ActivityAddDataBinding
import com.google.android.material.tabs.TabLayout

class AddData : AppCompatActivity() {

    private lateinit var binding : ActivityAddDataBinding

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddDataBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val viewPager: ViewPager = binding.viewPager
        val tabLayout: TabLayout = binding.tabLayout

        val fragments = listOf(AddDentistFragment(), AddProductFragment(), AddDentistServiceFragment()) // Create your fragments
        val titles = listOf("Добавить стоматолога", "Добавить продукты", "Добавить стоматологическую услугу") // Titles for your tabs

        val adapter = AddFragmentsAdapter(supportFragmentManager, fragments, titles)
        viewPager.adapter = adapter
        tabLayout.setupWithViewPager(viewPager)


        binding.backButton.setOnClickListener {
            finish()
        }

    }
}