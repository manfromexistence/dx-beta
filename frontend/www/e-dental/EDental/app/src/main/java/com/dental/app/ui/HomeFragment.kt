package com.dental.app.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.dental.app.AddData
import com.dental.app.AllFragment
import com.dental.app.databinding.FragmentHomeBinding


class HomeFragment : Fragment() {

    private var _binding : FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(inflater,container,false)

        binding.chatBlock.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Чат с доктором")
            requireContext().startActivity(intent)
        }

        binding.addBlock.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Онлайн аптека")
            requireContext().startActivity(intent)
        }

        binding.productBlock.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Выбор услуги")
            requireContext().startActivity(intent)
        }

        binding.doctorBlock.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Стоматологи")
            requireContext().startActivity(intent)
        }

        binding.healthCard.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Запись на прием")
            requireContext().startActivity(intent)
        }

        binding.profileBlock.setOnClickListener {
            val intent = Intent(requireContext(),AllFragment::class.java)
            intent.putExtra("screen","Личный кабинет")
            requireContext().startActivity(intent)
        }

        return binding.root
    }


}