package com.dental.app

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Intent
import android.icu.util.Calendar
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.dental.app.databinding.ActivityScheduleSessionBinding
import java.text.SimpleDateFormat
import java.util.Locale


@RequiresApi(Build.VERSION_CODES.N)
class ScheduleSession : AppCompatActivity() {

    private lateinit var binding : ActivityScheduleSessionBinding
    private var dateAndYear : String = ""
    private var time : String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityScheduleSessionBinding.inflate(layoutInflater)
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

        binding.imageView23.setOnClickListener {
            showDatePickerDialog()
        }

        binding.imageView24.setOnClickListener {
            showTimePickerDialog()
        }

        binding.backButton.setOnClickListener {
            finish()
        }


        binding.confirmSession.setOnClickListener {
            if (time.isNotEmpty() && dateAndYear.isNotEmpty()){
                val intent = Intent(this,ConfirmSchedule::class.java)
                intent.putExtra("achievement",acheivement)
                intent.putExtra("certificate",certificate)
                intent.putExtra("diploma",diploma)
                intent.putExtra("dob",dob)
                intent.putExtra("experience",experience)
                intent.putExtra("name",name)
                intent.putExtra("surname",surname)
                intent.putExtra("uuid",uuid)

                intent.putExtra("dateAndYear",dateAndYear)
                intent.putExtra("time",time)

                startActivity(intent)

            } else {
                Toast.makeText(this, "Пожалуйста, сначала выберите дату и время!",
                    Toast.LENGTH_SHORT).show()
            }
        }


    }

    private fun showDatePickerDialog() {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog = DatePickerDialog(
            this,
            { _, selectedYear, selectedMonth, selectedDay ->
                val selectedDate = formatDate(selectedDay, selectedMonth + 1, selectedYear)
                dateAndYear = selectedDate
                Toast.makeText(this, "Selected date: $selectedDate", Toast.LENGTH_SHORT).show()
                if (dateAndYear.isNotEmpty() && time.isNotEmpty()){
                    binding.selectedTime.visibility = View.VISIBLE
                    binding.selectedTime.text = "Выбранное время расписания: $dateAndYear $time"
                }
            },
            year,
            month,
            day
        )

        datePickerDialog.show()
    }

    private fun formatDate(day: Int, month: Int, year: Int): String {
        val sdf = SimpleDateFormat("dd-MM-yyyy", Locale.US)
        val calendar = Calendar.getInstance()
        calendar.set(year, month - 1, day)
        return sdf.format(calendar.time)
    }

    private fun showTimePickerDialog() {
        val calendar = Calendar.getInstance()
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        val minute = calendar.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(
            this,
            { _, selectedHour, selectedMinute ->
                val selectedTime = formatTime(selectedHour, selectedMinute)
                time = selectedTime
                Toast.makeText(this, "Selected time: $selectedTime", Toast.LENGTH_SHORT).show()
                if (dateAndYear.isNotEmpty() && time.isNotEmpty()){
                    binding.selectedTime.visibility = View.VISIBLE
                    binding.selectedTime.text = "Выбранное время расписания: $dateAndYear $time"
                }
            },
            hour,
            minute,
            true
        )

        timePickerDialog.show()
    }

    private fun formatTime(hour: Int, minute: Int): String {
        val sdf = SimpleDateFormat("HH:mm", Locale.US)
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, hour)
        calendar.set(Calendar.MINUTE, minute)
        return sdf.format(calendar.time)
    }
}