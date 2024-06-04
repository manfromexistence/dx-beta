package com.dental.e_dentaladmin

import android.app.DatePickerDialog
import android.icu.text.SimpleDateFormat
import android.icu.util.Calendar
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.dental.e_dentaladmin.databinding.ActivityAddDentistBinding
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.firestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.util.Locale

class AddDentist : AppCompatActivity(), DatePickerDialog.OnDateSetListener {

    private lateinit var binding : ActivityAddDentistBinding

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var user : FirebaseAuth
    private val db = FirebaseFirestore.getInstance()
    private var dob : String = ""
    private var isUserAlreadyRegisteredAsDentist :Boolean = false

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddDentistBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.dob.setOnClickListener {
            showDatePickerDialog()
        }

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Добавить стоматолога"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        user = FirebaseAuth.getInstance()


        binding.addDentistButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE
            scope.launch {
                val email = binding.editTextTextEmailAddress.text.toString().trim()
                val password = binding.editPassword.text.toString().trim()
                val name = binding.name.text.toString().trim()
                val surname = binding.surNname.text.toString().trim()
                val experience = binding.experience.text.toString().trim()
                val doctorCertificate = binding.dentistCertificate.text.toString().trim()
                val doctorDiploma = binding.dentistDiploma.text.toString().trim()
                val acheivement = binding.acheivement.text.toString().trim()


                if (email.isNotEmpty() && password.isNotEmpty() && name.isNotEmpty() && surname.isNotEmpty() && experience.isNotEmpty() && doctorCertificate.isNotEmpty() &&
                    doctorDiploma.isNotEmpty() && acheivement.isNotEmpty() && dob.isNotEmpty()
                ) {

                    FirebaseAuth.getInstance().createUserWithEmailAndPassword(email,password)
                        .addOnSuccessListener {
                            val data = hashMapOf(
                                "name" to name,
                                "surname" to surname,
                                "experience" to experience,
                                "certificate" to doctorCertificate,
                                "diploma" to doctorDiploma,
                                "achievement" to acheivement,
                                "dob" to dob,
                                "email" to email,
                                "password" to password,
                                "uuid" to FirebaseAuth.getInstance().currentUser!!.uid
                            )

                            db.collection("dentists").document().set(data).addOnSuccessListener {
                                saveDataInUsersField(email,name,surname,password)
                                clearText()
                                Toast.makeText(
                                    this@AddDentist,
                                    "Стоматолог успешно добавлен",
                                    Toast.LENGTH_SHORT
                                ).show()
                                binding.progressBar.visibility = View.GONE
                                isUserAlreadyRegisteredAsDentist = true

                            }.addOnFailureListener {
                                clearText()
                                Toast.makeText(this@AddDentist, "произошла ошибка!", Toast.LENGTH_SHORT).show()
                                binding.progressBar.visibility = View.GONE
                            }
                        }.addOnFailureListener {
                            binding.progressBar.visibility = View.GONE
                            clearText()
                            Toast.makeText(this@AddDentist, it.localizedMessage, Toast.LENGTH_SHORT).show()
                        }



                } else {
                    Toast.makeText(
                        this@AddDentist,
                        "Пожалуйста, заполните все поля!",
                        Toast.LENGTH_SHORT
                    ).show()
                    binding.progressBar.visibility = View.GONE
                }
            }


        }

    }


    @RequiresApi(Build.VERSION_CODES.N)
    private fun showDatePickerDialog() {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog = DatePickerDialog(this, this@AddDentist, year, month, day)
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
        binding.editTextTextEmailAddress.text.clear()
        binding.editPassword.text.clear()
        binding.name.text.clear()
        binding.surNname.text.clear()
        binding.dob.text.clear()
        binding.experience.text.clear()
        binding.dentistCertificate.text.clear()
        binding.dentistDiploma.text.clear()
        binding.acheivement.text.clear()

        dob = ""
    }

    private fun saveDataInUsersField(email:String, name : String, surname:String,password : String) {
        scope.launch {
            val data = hashMapOf(
                "age" to "18",
                "city" to "Shymkent",
                "email" to email,
                "gender" to "Male",
                "name" to name,
                "surname" to surname,
                "password" to password,
                "uuid" to FirebaseAuth.getInstance().currentUser!!.uid
            )

            val db = Firebase.firestore
            db.collection("users").document(FirebaseAuth.getInstance().currentUser!!.uid)
                .set(data).addOnSuccessListener {
                    clearText()
                    binding.progressBar.visibility = View.GONE
                    FirebaseAuth.getInstance().signOut()
                }.addOnFailureListener {
                    clearText()
                    binding.progressBar.visibility = View.GONE
                }
        }
    }


    override fun onSupportNavigateUp(): Boolean {
        finish()
        return super.onSupportNavigateUp()
    }
}