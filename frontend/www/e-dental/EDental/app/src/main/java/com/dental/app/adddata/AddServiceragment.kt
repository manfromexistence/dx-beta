package com.dental.app.adddata

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.dental.app.R
import com.dental.app.databinding.FragmentAddServiceragmentBinding
import com.dental.app.databinding.FragmentEventBinding


class AddServiceragment : Fragment() {

    private var _binding : FragmentAddServiceragmentBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentAddServiceragmentBinding.inflate(inflater,container,false)





        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }


}