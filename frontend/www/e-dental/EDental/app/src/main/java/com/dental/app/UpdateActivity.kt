package com.dental.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.lifecycle.ViewModelProvider
import com.dental.app.adapters.UpdateAdapter
import com.dental.app.databinding.ActivityUpdateBinding
import com.dental.app.viewmodels.UpdateViewModel

class UpdateActivity : AppCompatActivity() {
    private lateinit var binding : ActivityUpdateBinding
    private lateinit var viewModel : UpdateViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUpdateBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[UpdateViewModel::class.java]
        setContentView(binding.root)


        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Обновления"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        viewModel.updates.observe(this@UpdateActivity){
            if (it.isNotEmpty()){
                binding.progressBar.visibility = View.GONE
                val adapter = UpdateAdapter(it,binding.textView33)
                binding.messageRec.adapter = adapter
                binding.messageRec.hasFixedSize()
            } else {
                binding.progressBar.visibility = View.GONE
                binding.textView33.visibility = View.VISIBLE
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}