package com.dental.e_dentaladmin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.dental.e_dentaladmin.adapters.HomeAdapter
import com.dental.e_dentaladmin.adapters.OnItemClickListener
import com.dental.e_dentaladmin.databinding.ActivitySeeAllBinding
import com.dental.e_dentaladmin.models.DoctorListModel
import com.dental.e_dentaladmin.viewmodels.DoctorViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob

class SeeAll : AppCompatActivity() {

    private lateinit var binding : ActivitySeeAllBinding
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : DoctorViewModel
    private lateinit var adapter : HomeAdapter
    private lateinit var list : ArrayList<DoctorListModel>
    private var fSource = FirebaseSource()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySeeAllBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[DoctorViewModel::class.java]
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Врачи"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        list = ArrayList()

        viewModel.doctorsList.observe(this@SeeAll){
            adapter = HomeAdapter(it,binding.textView24,object : OnItemClickListener {
                override fun onItemClick(position: Int) {
                    val item = it[position].uuid
                    fSource.deleteDoctor(item!!)
                    it.removeAt(position)
                    adapter.notifyDataSetChanged()
                    Toast.makeText(this@SeeAll,"Стоматолог удален!", Toast.LENGTH_LONG).show()
                }
            })

            val manager = LinearLayoutManager(this@SeeAll)
            binding.docRec.layoutManager = manager
            binding.docRec.adapter = adapter
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.add_doctor_menu,menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.addDoctor -> {
                startActivity(Intent(this@SeeAll,AddDentist::class.java))
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}