package com.dental.app.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProvider
import com.dental.app.AddDentistForChat
import com.dental.app.MessagingScreen
import com.dental.app.adapters.ChatAdapter
import com.dental.app.adapters.OnItemClickListener
import com.dental.app.databinding.FragmentChatBinding
import com.dental.app.models.DoctorListModel
import com.dental.app.viewmodels.RecentChatViewModel


class ChatFragment : Fragment() {

    private var _binding : FragmentChatBinding? = null
    private val binding get() = _binding!!
    private lateinit var list : ArrayList<DoctorListModel>
    private lateinit var viewModel : RecentChatViewModel
    private lateinit var adapter: ChatAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentChatBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[RecentChatViewModel::class.java]


        list = ArrayList()

        viewModel.doctorsList.observe(requireActivity()){
            if (it.isNotEmpty()){
                Log.d("recentChats",it.size.toString()+" ACTIVITY SIZE")
                list.addAll(it)
                adapter.updateList(it)

            } else {
                binding.progressBar.visibility = View.GONE
                binding.textView33.visibility = View.VISIBLE
            }
        }

        adapter = ChatAdapter(list,object : OnItemClickListener{
            override fun onItemClick(position: Int) {
                val name = list[position].name
                val surname = list[position].surname
                val uuid = list[position].uuid
                val experience = list[position].experience

                val intent = Intent(requireContext(),MessagingScreen::class.java)
                intent.putExtra("name",name)
                intent.putExtra("surname",surname)
                intent.putExtra("uuid",uuid)
                intent.putExtra("experience",experience)
                requireContext().startActivity(intent)
            }

        },binding.textView33)


        binding.chatRes.adapter = adapter
        binding.chatRes.hasFixedSize()



        binding.floatingActionButton2.setOnClickListener {
           startActivity(Intent(requireContext(),AddDentistForChat::class.java))
        }


        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}