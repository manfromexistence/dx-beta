package com.dental.app

//noinspection SuspiciousImport
import android.R
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.RadioButton
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.dental.app.databinding.ActivitySignupScreenBinding
import com.dental.app.models.UserDataModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class SignupScreen : AppCompatActivity() {

    private lateinit var binding : ActivitySignupScreenBinding

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var user : FirebaseAuth
    private val db = FirebaseFirestore.getInstance()
    private var age : String = ""
    private var gender : String = ""
    private var city : String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignupScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()
        user = FirebaseAuth.getInstance()
        val uuid = user.uid


        binding.radioGroup.setOnCheckedChangeListener { _, checkedId ->
            val radioButton: RadioButton = findViewById(checkedId)
            val selectedText = radioButton.text.toString()
            gender = if (selectedText == "Муж") {
                "Male"
            } else {
                "Women"
            }
            Log.d("selectedItem", gender)
        }

        binding.constraintLayout.setOnClickListener {
            showAge()
        }

        binding.citytext2.setOnClickListener {
            showCitySelectionDialog()
        }

        binding.materialButton.setOnClickListener {
            val surname = binding.surname.text.toString().trim()
            val name = binding.name.text.toString().trim()
            val email = binding.emailAddress.text.toString().trim()
            val password = binding.password.text.toString().trim()
            binding.progressBar.visibility = android.view.View.VISIBLE

            scope.launch {
                if (surname.isNotEmpty() && name.isNotEmpty()&& email.isNotEmpty() && password.isNotEmpty() && age != "" && gender != "" && city != ""){

                    if (password.length >= 6) {
                        val userDataModel = UserDataModel(uuid.toString(),surname,name,city,email,password,
                            age,gender)
                        signupProcess(userDataModel)
                    } else {
                        Toast.makeText(this@SignupScreen,"Password length should be 6 character long!",Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = android.view.View.GONE
                    }

                } else {
                  Toast.makeText(this@SignupScreen,"Please enter all the details!",Toast.LENGTH_SHORT).show()
                    binding.progressBar.visibility = android.view.View.GONE
                }
            }

        }



    }


    private fun showCitySelectionDialog() {
        val options = arrayOf("Almaty", "Shymkent", "Karaganda","Aktobe","Taraz","Pavlodar","Ust-Kamenogorsk","Kostanay","Petropavl")

        val spinner = Spinner(this)
        val adapter = ArrayAdapter(this, R.layout.simple_spinner_dropdown_item, options)
        spinner.adapter = adapter

        AlertDialog.Builder(this)
            .setTitle("Select a City")
            .setView(spinner)
            .setPositiveButton("OK") { dialog, _ ->
                val selectedCity = options[spinner.selectedItemPosition]
                // Do something with the selected city
                binding.citytext2.setText(selectedCity)
                city = selectedCity
                Log.d("city",selectedCity)
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                binding.citytext2.setText("Almaty")
                city = ""
                dialog.dismiss()
            }
            .show()
    }

    private fun showAge() {

        val options = arrayOf("1", "2", "3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18",
            "19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
            "41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60",
            "61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80",
            "81","82","83","84","85","86","87","89","90","91","92","93","94","95","96","97","98","99","100")


        val spinner = Spinner(this)
        val adapter = ArrayAdapter(this, R.layout.simple_spinner_dropdown_item, options)
        spinner.adapter = adapter

        AlertDialog.Builder(this)
            .setTitle("Select Your Age")
            .setView(spinner)
            .setPositiveButton("OK") { dialog, _ ->
                val selectedCity = options[spinner.selectedItemPosition]
                // Do something with the selected city
                binding.textView4.text = selectedCity
                age = selectedCity
                Log.d("age",selectedCity)
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                binding.textView4.text = "1"
                age = ""
                dialog.dismiss()
            }
            .show()
    }

    private fun signupProcess(userDataModel: UserDataModel) {
        scope.launch {
            user.createUserWithEmailAndPassword(userDataModel.email,userDataModel.password).addOnSuccessListener {
                val sharedPreferences = getSharedPreferences(
                    "checkLogin",
                    Context.MODE_PRIVATE
                )
                val editor = sharedPreferences.edit()
                editor.putBoolean("isLogin", true).apply()
                saveUserData(userDataModel)

            }.addOnFailureListener {
                Log.d("authentication",it.localizedMessage!!.toString())
                Toast.makeText(this@SignupScreen,it.localizedMessage!!.toString(),Toast.LENGTH_SHORT).show()
                binding.progressBar.visibility = android.view.View.GONE
            }
        }
    }

    private fun saveUserData(data : UserDataModel){
        scope.launch {
            val userData = hashMapOf("surname" to data.name,"name" to data.surname,"city" to data.city,
                "email" to data.email, "age" to data.age,"gender" to data.gender,"password" to data.password,
                "uuid" to data.uuid)

            val usersCollection = db.collection("users")
            val userDocument = usersCollection.document(user.currentUser!!.uid)
            userDocument.set(userData).addOnSuccessListener {
                Log.d(ContentValues.TAG, "DocumentSnapshot added with ID: ${userDocument.id}")
                val intent = Intent(this@SignupScreen, MainActivity::class.java)
                startActivity(intent)
                println("Login Successful")
                storeLogin()
                binding.progressBar.visibility = android.view.View.GONE
            }.addOnFailureListener {
                Log.w(ContentValues.TAG, "Error adding document", it)
                binding.progressBar.visibility = android.view.View.GONE
            }
        }
    }

    private fun storeLogin() {
        val sharedPreferences = getSharedPreferences("Login", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putBoolean("isLogin", true)
        editor.apply()
    }


}