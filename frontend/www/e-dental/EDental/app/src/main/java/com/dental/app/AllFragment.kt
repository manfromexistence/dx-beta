package com.dental.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dental.app.databinding.ActivityAllFragmentBinding
import com.dental.app.ui.ChatFragment
import com.dental.app.ui.ConsultantFragment
import com.dental.app.ui.EventFragment
import com.dental.app.ui.PharmacyFragment
import com.dental.app.ui.ProductFragment
import com.dental.app.ui.ProfileFragment

class AllFragment : AppCompatActivity() {

    private lateinit var bindingAllFragment: ActivityAllFragmentBinding
    private val fragmentManager = supportFragmentManager


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        bindingAllFragment = ActivityAllFragmentBinding.inflate(layoutInflater)
        setContentView(bindingAllFragment.root)

        val data = intent.extras
        val screen = data!!.getString("screen")
        setSupportActionBar(bindingAllFragment.toolbar)
        supportActionBar?.title = screen
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        when (screen.toString()) {
            "Чат с доктором" -> {
                val recording = ChatFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
            "Онлайн аптека" -> {
                val recording = PharmacyFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
            "Выбор услуги" -> {
                val recording = ProductFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
            "Стоматологи" -> {
                val recording = ConsultantFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
            "Личный кабинет" -> {
                val recording = ProfileFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
            "Запись на прием" -> {
                val recording = EventFragment()
                fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
            }
        }







    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}