package com.dental.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.dental.app.databinding.ActivityConfirmServiceScheduleBinding
import com.dental.app.viewmodels.UserDetailViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.lang.reflect.InvocationTargetException

class ConfirmServiceSchedule : AppCompatActivity() {

    private lateinit var binding : ActivityConfirmServiceScheduleBinding

    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : UserDetailViewModel
    private var patientName : String = ""
    private var patientUUID : String = ""
    private val db = FirebaseFirestore.getInstance()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityConfirmServiceScheduleBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[UserDetailViewModel::class.java]
        setContentView(binding.root)

        val data = intent.extras
        val offeredBy = data!!.getString("offeredBy","")
        val price = data.getLong("price",0L)
        val descrption = data.getString("description","")
        val serviceName = data.getString("serviceName","")

        val dateAndYear = data.getString("dateAndYear","")
        val time = data.getString("time","")


        scope.launch {
            try {
                val user = viewModel.getUserData(FirebaseAuth.getInstance().currentUser!!.uid)
                binding.patientName.text = "${user.name} ${user.surname}"
                patientName = "${user.name} ${user.surname}"
                patientUUID = user.uuid
            } catch (e : NullPointerException){
                e.printStackTrace()
            } catch (e : InvocationTargetException){
                e.printStackTrace()
            }
        }

        binding.backButton.setOnClickListener {
            finish()
        }

        binding.doctorName.text = offeredBy
        binding.date.text = dateAndYear
        binding.time.text = time

        binding.confirmEntry.setOnClickListener {
            if (binding.phoneNumber.text.isNotEmpty() && binding.productName.text.isNotEmpty()){

                if (binding.phoneNumber.text.toString().length < 8) {
                    Toast.makeText(this@ConfirmServiceSchedule,"Номер телефона должен состоять из 8 цифр.",Toast.LENGTH_SHORT).show()
                } else {
                    val info = hashMapOf(
                        "date" to dateAndYear,
                        "time" to time,
                        "serviceName" to serviceName,
                        "patientName" to patientName,
                        "dentistName" to offeredBy,
                        "request" to binding.productName.text.toString().trim(),
                        "phoneNo" to binding.phoneNumber.text.toString().trim(),
                        "patientUUID" to patientUUID
                    )

                    db.collection("serviceSchedules").document().set(info).addOnSuccessListener {
                        val update = UpdateModel("service",dateAndYear,time,serviceName,offeredBy,patientName)
                        saveUpdate(update)
                        binding.progressBar.visibility = View.GONE
                        startActivity(Intent(this,MainActivity::class.java))
                        Toast.makeText(this,"встреча запланирована успешно", Toast.LENGTH_SHORT).show()
                        finishAffinity()
                    }.addOnFailureListener {
                        Toast.makeText(this,"произошла ошибка", Toast.LENGTH_SHORT).show()
                        binding.progressBar.visibility = View.GONE
                    }
                }


            }else {
                Toast.makeText(this,"Пожалуйста, заполните все детали!", Toast.LENGTH_SHORT).show()
                binding.progressBar.visibility = View.GONE
            }
        }

    }


    data class UpdateModel(
        val updateType : String? = "",
        val date : String? = "",
        val time : String? = "",
        val serviceName : String? = "",
        val dentistName : String? = "",
        val patientName : String? = "",
        val uuid : String? = ""
    )
    fun saveUpdate(updateModel : UpdateModel){
        val data = hashMapOf(
            "updateType" to updateModel.updateType,
            "date" to updateModel.date,
            "time" to updateModel.time,
            "serviceName" to updateModel.serviceName,
            "dentistName" to updateModel.dentistName,
            "patientName" to updateModel.patientName,
            "uuid" to FirebaseAuth.getInstance().currentUser!!.uid
        )
        db.collection("updates").document().set(data).addOnSuccessListener {
            Log.d("Update","Created")
        }.addOnFailureListener {
            Log.e("ERROR",it.localizedMessage!!)
        }
    }
}