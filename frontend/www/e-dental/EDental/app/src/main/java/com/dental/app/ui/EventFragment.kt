package com.dental.app.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.dental.app.adapters.DoctorListAdapter
import com.dental.app.databinding.FragmentEventBinding
import com.dental.app.models.DoctorListModel
import com.dental.app.viewmodels.DoctorListViewModel


class EventFragment : Fragment() {

    private var _binding : FragmentEventBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel : DoctorListViewModel
    private val filterList = ArrayList<DoctorListModel>()
    private lateinit var adapter: DoctorListAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentEventBinding.inflate(layoutInflater,container,false)



        viewModel = ViewModelProvider(this)[DoctorListViewModel::class.java]

        adapter = DoctorListAdapter(filterList,requireContext(),binding.noDentist)
        binding.progressBar.visibility = View.GONE
        binding.consultationRec.adapter = adapter
        binding.consultationRec.hasFixedSize()

        viewModel.doctorsList.observe(requireActivity()){
            if (it.isNotEmpty()){
                filterList.addAll(it)
                adapter.updateList(it)
            } else {
                binding.progressBar.visibility = View.GONE
                binding.noDentist.visibility = View.VISIBLE
            }
        }

        return binding.root
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }


}