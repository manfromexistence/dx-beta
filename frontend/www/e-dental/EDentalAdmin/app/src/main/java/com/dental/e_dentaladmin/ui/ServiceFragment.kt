package com.dental.e_dentaladmin.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.dental.e_dentaladmin.AddService
import com.dental.e_dentaladmin.FirebaseSource
import com.dental.e_dentaladmin.adapters.OnItemClickListener
import com.dental.e_dentaladmin.adapters.ServiceAdapter
import com.dental.e_dentaladmin.databinding.FragmentServiceBinding
import com.dental.e_dentaladmin.viewmodels.ServiceViewModel


class ServiceFragment : Fragment() {

    private var _binding : FragmentServiceBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel : ServiceViewModel
    private lateinit var adapter : ServiceAdapter
    private var fSource = FirebaseSource()



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentServiceBinding.inflate(inflater,container,false)
        viewModel = ViewModelProvider(this)[ServiceViewModel::class.java]


        viewModel.services.observe(requireActivity()){ serviceList ->
            if (serviceList.isNotEmpty()) {
                adapter = ServiceAdapter(serviceList,binding.textView6,object :
                    OnItemClickListener {
                    override fun onItemClick(position: Int) {
                        val item = serviceList[position].serviceName
                        fSource.deleteService(item!!)
                        serviceList.removeAt(position)
                        adapter.notifyDataSetChanged()
                        Toast.makeText(requireContext(),"Сервис удален!", Toast.LENGTH_LONG).show()
                    }
                })

                val manager = LinearLayoutManager(requireContext())
                binding.podcastRecycler.layoutManager = manager
                binding.podcastRecycler.adapter = adapter

            } else {
                binding.textView6.visibility = View.VISIBLE
            }
        }


        binding.addProduct.setOnClickListener {
            startActivity(Intent(requireContext(), AddService::class.java))
        }


        return binding.root
    }

}