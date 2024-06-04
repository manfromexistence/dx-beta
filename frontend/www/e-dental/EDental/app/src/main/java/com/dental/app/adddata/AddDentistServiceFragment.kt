package com.dental.app.adddata

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.dental.app.databinding.FragmentAddDentistServiceBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class AddDentistServiceFragment : Fragment() {

    private var _binding : FragmentAddDentistServiceBinding? = null
    private val binding get() = _binding!!

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var user : FirebaseAuth
    private val db = FirebaseFirestore.getInstance()
    private var dN : String = ""
    private var isUserAlreadyRegisteredAsDentist :Boolean = false

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentAddDentistServiceBinding.inflate(inflater,container,false)

        user = FirebaseAuth.getInstance()


        scope.launch {
            if (checkDentistExists(user.currentUser!!.uid)){
                isUserAlreadyRegisteredAsDentist = true
                Log.d("DentistExist","You can add Service")
                binding.mainLayout.visibility = View.VISIBLE
                binding.registFirstText.visibility = View.GONE
            } else {
                isUserAlreadyRegisteredAsDentist = false
                binding.mainLayout.visibility = View.GONE
                binding.registFirstText.visibility = View.VISIBLE
            }
        }


        binding.addDentistServiceButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE

            scope.launch {
                val serviceName = binding.surname.text.toString().trim()
                val description = binding.name.text.toString().trim()
                val price = binding.experience.text.toString().trim()

                if (serviceName.isNotEmpty() && description.isNotEmpty() && price.isNotEmpty()){

                    val data = hashMapOf(
                        "serviceName" to serviceName,
                        "description" to description,
                        "price" to price.toInt(),
                        "offeredBy" to dN,
                    )

                    db.collection("services").document().set(data).addOnSuccessListener {
                        Toast.makeText(requireContext(),"Услуга стоматолога успешно добавлена", Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                        clearText()

                    }.addOnFailureListener {
                        Toast.makeText(requireContext(),it.localizedMessage, Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                    }
                }else {
                    Toast.makeText(requireContext(),"Пожалуйста, заполните все поля!", Toast.LENGTH_SHORT).show()
                    binding.progressBar.visibility = View.GONE
                }

            }
        }



        return binding.root
    }

    private suspend fun checkDentistExists(uuid: String): Boolean {
        val db = FirebaseFirestore.getInstance()
        val dentistCollection = db.collection("dentists")

        return try {
            val querySnapshot = dentistCollection.whereEqualTo("uuid", uuid).limit(1).get().await()
            dN = if (!querySnapshot.isEmpty) {
                val document = querySnapshot.documents[0]
                val dentistName = document.getString("name")
                dentistName!!
            } else {
                ""
            }
            binding.dentistCertificate.setText(dN)
            !querySnapshot.isEmpty
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    private fun clearText(){
        binding.name.text.clear()
        binding.surname.text.clear()
        binding.experience.text.clear()
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
        scope.cancel()
    }

}