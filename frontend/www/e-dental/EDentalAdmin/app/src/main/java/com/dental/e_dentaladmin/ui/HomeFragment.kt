package com.dental.e_dentaladmin.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.dental.e_dentaladmin.FirebaseSource
import com.dental.e_dentaladmin.SeeAll
import com.dental.e_dentaladmin.adapters.HomeAdapter
import com.dental.e_dentaladmin.adapters.OnItemClickListener
import com.dental.e_dentaladmin.databinding.FragmentHomeBinding
import com.dental.e_dentaladmin.models.DoctorListModel
import com.dental.e_dentaladmin.viewmodels.DoctorViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob


class HomeFragment : Fragment() {

    private var _binding : FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : DoctorViewModel
    private lateinit var adapter : HomeAdapter
    private lateinit var list : ArrayList<DoctorListModel>
    private var fSource = FirebaseSource()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[DoctorViewModel::class.java]


        // send user to screen where user can see list of doctors
        binding.seeAll.setOnClickListener {
            startActivity(Intent(requireContext(),SeeAll::class.java))
        }

        list = ArrayList()

        adapter = HomeAdapter(list,binding.textView9,object :OnItemClickListener{
            override fun onItemClick(position: Int) {
                val item = list[position].uuid
                fSource.deleteDoctor(item!!)
                list.removeAt(position)
                adapter.notifyDataSetChanged()
                Toast.makeText(requireContext(),"Стоматолог удален!", Toast.LENGTH_LONG).show()
            }
        })

        val manager = LinearLayoutManager(requireContext())
        binding.categoryRecycler.layoutManager = manager
        binding.categoryRecycler.adapter = adapter


        viewModel._homeListData.observe(requireActivity()){ data ->
           adapter.updateList(data)
            list.addAll(data)
        }


        return binding.root
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }
}