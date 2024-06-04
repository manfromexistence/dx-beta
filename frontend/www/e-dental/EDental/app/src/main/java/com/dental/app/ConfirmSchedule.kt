package com.dental.app

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.dental.app.databinding.ActivityConfirmScheduleBinding
import com.dental.app.viewmodels.UserDetailViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.lang.reflect.InvocationTargetException

class ConfirmSchedule : AppCompatActivity() {

    private lateinit var binding : ActivityConfirmScheduleBinding
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : UserDetailViewModel
    private var patientName : String = ""
    private var patientUUID : String = ""
    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityConfirmScheduleBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[UserDetailViewModel::class.java]
        setContentView(binding.root)



        val data = intent.extras
        val acheivement = data!!.getString("achievement","")
        val certificate = data.getString("certificate","")
        val diploma = data.getString("diploma","")
        val dob = data.getString("dob","")
        val experience = data.getString("experience","")
        val name = data.getString("name","")
        val surname = data.getString("surname","")
        val uuid = data.getString("uuid","")

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

        binding.doctorName.text = name
        binding.date.text = dateAndYear
        binding.time.text = time



        binding.confirmEntry.setOnClickListener {
           if (binding.phoneNumber.text.isNotEmpty() && binding.productName.text.isNotEmpty()){

               if (binding.phoneNumber.text.toString().length < 8) {
                   Toast.makeText(this@ConfirmSchedule,"Номер телефона должен состоять из 8 цифр.",Toast.LENGTH_SHORT).show()
               } else {

                   val info = hashMapOf(
                       "date" to dateAndYear,
                       "time" to time,
                       "patientName" to patientName,
                       "dentistName" to name,
                       "request" to binding.productName.text.toString().trim(),
                       "phoneNo" to binding.phoneNumber.text.toString().trim(),
                       "doctorUUID" to uuid,
                       "patientUUID" to patientUUID
                   )

                   db.collection("meetings").document().set(info).addOnSuccessListener {
                       binding.progressBar.visibility = View.GONE
                       val func = ConfirmServiceSchedule()

                       val update = ConfirmServiceSchedule.UpdateModel("consultant",dateAndYear,time,"none",name,patientName)
                       func.saveUpdate(update)

                       startActivity(Intent(this@ConfirmSchedule,MainActivity::class.java))
                       Toast.makeText(this@ConfirmSchedule,"встреча запланирована успешно",Toast.LENGTH_SHORT).show()
                       finishAffinity()

                   }.addOnFailureListener {
                       Toast.makeText(this@ConfirmSchedule,"произошла ошибка",Toast.LENGTH_SHORT).show()
                       binding.progressBar.visibility = View.GONE
                   }
               }

           }else {
               Toast.makeText(this@ConfirmSchedule,"Пожалуйста, заполните все детали!",Toast.LENGTH_SHORT).show()
               binding.progressBar.visibility = View.GONE
           }
        }
    }
    data class MeetingModel(
        val date : String = "",
        val time : String = "",
        val patientName : String = "",
        val dentistName : String = "",
        val phoneNo : String = "",
        val request : String = "",
        val doctorUUID : String = "",
        val patientUUID : String = "",
    )

    data class UserDetails(
        val surname : String = "",
        val name : String = "",
        val city : String = "",
        val email : String = "",
        val uuid : String = "",
        val age : String = "",
        val gender : String = "",
        val password : String = "",
    )
}