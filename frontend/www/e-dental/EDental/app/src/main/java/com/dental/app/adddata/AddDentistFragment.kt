package com.dental.app.adddata

import android.app.DatePickerDialog
import android.icu.text.SimpleDateFormat
import android.icu.util.Calendar
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.dental.app.databinding.FragmentAddDentistBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import java.util.Locale


@RequiresApi(Build.VERSION_CODES.N)
class AddDentistFragment : Fragment(), DatePickerDialog.OnDateSetListener {

    private var _binding : FragmentAddDentistBinding? = null
    private val binding get() = _binding!!

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var user : FirebaseAuth
    private val db = FirebaseFirestore.getInstance()
    private var dob : String = ""
    private var isUserAlreadyRegisteredAsDentist :Boolean = false

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentAddDentistBinding.inflate(inflater,container,false)

        binding.dob.setOnClickListener {
            showDatePickerDialog()
        }

        user = FirebaseAuth.getInstance()

        scope.launch {
            isUserAlreadyRegisteredAsDentist = checkDentistExists(user.currentUser!!.uid)
            Log.d("isDentistExist",isUserAlreadyRegisteredAsDentist.toString())
        }

        binding.addDentistButton.setOnClickListener {
            if (isUserAlreadyRegisteredAsDentist){
                Toast.makeText(requireContext(),"Вы уже зарегистрированы как стоматолог",Toast.LENGTH_SHORT).show()
            }else {
                binding.progressBar.visibility = View.VISIBLE
                scope.launch {
                    val name = binding.name.text.toString().trim()
                    val surname = binding.surNname.text.toString().trim()
                    val experience = binding.experience.text.toString().trim()
                    val doctorCertificate = binding.dentistCertificate.text.toString().trim()
                    val doctorDiploma = binding.dentistDiploma.text.toString().trim()
                    val acheivement = binding.acheivement.text.toString().trim()


                    if (name.isNotEmpty() && surname.isNotEmpty() && experience.isNotEmpty() && doctorCertificate.isNotEmpty()&&
                        doctorDiploma.isNotEmpty()&& acheivement.isNotEmpty() && dob.isNotEmpty()){

                        val data = hashMapOf(
                            "name" to name,
                            "surname" to surname,
                            "experience" to experience,
                            "certificate" to doctorCertificate,
                            "diploma" to doctorDiploma,
                            "achievement" to acheivement,
                            "dob" to dob,
                            "uuid" to user.currentUser!!.uid
                        )

                        db.collection("dentists").document().set(data).addOnSuccessListener {
                            clearText()
                            Toast.makeText(requireContext(),"Стоматолог успешно добавлен",Toast.LENGTH_SHORT).show()
                            binding.progressBar.visibility = View.GONE
                            isUserAlreadyRegisteredAsDentist = true

                        }.addOnFailureListener {
                            clearText()
                            Toast.makeText(requireContext(),"произошла ошибка!",Toast.LENGTH_SHORT).show()
                            binding.progressBar.visibility = View.GONE
                        }

                    } else {
                        Toast.makeText(requireContext(),"Пожалуйста, заполните все поля!",Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                    }
                }
            }
        }


        return binding.root
    }


    private fun showDatePickerDialog() {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog = DatePickerDialog(requireContext(), this@AddDentistFragment, year, month, day)
        datePickerDialog.show()
    }

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onDateSet(view: android.widget.DatePicker?, year: Int, month: Int, dayOfMonth: Int) {
        val selectedDate = Calendar.getInstance()
        selectedDate.set(year, month, dayOfMonth)

        val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        val d = dateFormat.format(selectedDate.time)
        dob = d

        binding.dob.setText(d)
    }

    private fun clearText(){
        binding.name.text.clear()
        binding.surNname.text.clear()
        binding.dob.text.clear()
        binding.experience.text.clear()
        binding.dentistCertificate.text.clear()
        binding.dentistDiploma.text.clear()
        binding.acheivement.text.clear()

        dob = ""
    }

    private suspend fun checkDentistExists(uuid: String): Boolean {
        val db = FirebaseFirestore.getInstance()
        val dentistCollection = db.collection("dentists")

        return try {
            val querySnapshot = dentistCollection.whereEqualTo("uuid", uuid).limit(1).get().await()
            !querySnapshot.isEmpty
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
}