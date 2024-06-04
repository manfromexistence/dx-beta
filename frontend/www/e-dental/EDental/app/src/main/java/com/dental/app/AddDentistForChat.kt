package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.lifecycle.ViewModelProvider
import com.dental.app.adapters.ChatAdapter
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.databinding.ActivityAddDentistForChatBinding
import com.dental.app.models.DoctorListModel
import com.dental.app.viewmodels.DoctorListViewModel

class AddDentistForChat : AppCompatActivity() {

    private lateinit var binding : ActivityAddDentistForChatBinding
    private lateinit var list : ArrayList<DoctorListModel>
    private lateinit var viewModel : DoctorListViewModel
    private lateinit var adapter: ChatAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddDentistForChatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[DoctorListViewModel::class.java]

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Выбрать консультанта"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)

        list = ArrayList()


        viewModel.doctorsList.observe(this){
            if (it.isNotEmpty()){
                list.addAll(it)
                adapter.updateList(it)
            } else {
                binding.progressBar.visibility = View.GONE
                binding.textView33.visibility = View.VISIBLE
            }
        }

        adapter = ChatAdapter(list,object : OnItemClickListener {
            override fun onItemClick(position: Int) {
                val name = list[position].name
                val surname = list[position].surname
                val uuid = list[position].uuid
                val experience = list[position].experience

                val intent = Intent(this@AddDentistForChat,MessagingScreen::class.java)
                intent.putExtra("name",name)
                intent.putExtra("surname",surname)
                intent.putExtra("uuid",uuid)
                intent.putExtra("experience",experience)
                this@AddDentistForChat.startActivity(intent)
            }

        },binding.textView33)


        binding.messageRec.adapter = adapter

    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}