package com.dental.app.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.dental.app.adapters.DoctorListAdapter
import com.dental.app.databinding.FragmentConsultantBinding
import com.dental.app.models.DoctorListModel
import com.dental.app.viewmodels.DoctorListViewModel


class ConsultantFragment : Fragment() {

    private var _binding : FragmentConsultantBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel : DoctorListViewModel
    private var options : Boolean = false
    private val list = ArrayList<DoctorListModel>()
    private val filterList = ArrayList<DoctorListModel>()
    private lateinit var adapter: DoctorListAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentConsultantBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[DoctorListViewModel::class.java]

        adapter = DoctorListAdapter(filterList,requireContext(),binding.textView25)
        binding.progressBar.visibility = View.GONE
        binding.doctorListRec.adapter = adapter
        binding.doctorListRec.hasFixedSize()


        viewModel.doctorsList.observe(requireActivity()){
            if (it.isNotEmpty()){
                filterList.addAll(it)
                adapter.updateList(it)
            } else {
                binding.progressBar.visibility = View.GONE
                binding.textView25.visibility = View.VISIBLE
            }
        }

        binding.experienceYears.setOnClickListener {
            if (!options){
               binding.filterOptions.visibility = View.VISIBLE
               options = true
            } else {
                binding.filterOptions.visibility = View.GONE
                options = false
            }
        }


        binding.oneYear.setOnClickListener {
            filterByYears(1)
            binding.filterOptions.visibility = View.GONE
            options = false
        }

        binding.twoYear.setOnClickListener {
            filterByYears(2)
            binding.filterOptions.visibility = View.GONE
            options = false
        }

        binding.threeYear.setOnClickListener {
            filterByYears(3)
            binding.filterOptions.visibility = View.GONE
            options = false
        }

        binding.fourYear.setOnClickListener {
            filterByYears(4)
            binding.filterOptions.visibility = View.GONE
            options = false
        }
        binding.fiveYear.setOnClickListener {
            filterByYears(5)
            binding.filterOptions.visibility = View.GONE
            options = false
        }
        binding.sixYear.setOnClickListener {
            filterByYears(6)
            binding.filterOptions.visibility = View.GONE
            options = false
        }
        binding.sevenyear.setOnClickListener {
            filterByYears(7)
            binding.filterOptions.visibility = View.GONE
            options = false
        }
        binding.clearFilter.setOnClickListener {
            filterByYears(0)
            binding.filterOptions.visibility = View.GONE
            options = false
        }




        return binding.root
    }


    private fun filterByYears(year: Int) {
        list.clear()
        for (item in filterList) {
            if (item.experience!!.toInt() == year) {
                list.add(item)
            } else if (year == 0){
                list.clear()
                list.addAll(filterList)
            }
        }
        adapter.updateList(list)
    }


}