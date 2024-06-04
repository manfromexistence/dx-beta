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
import com.dental.app.databinding.ActivityServiceScheduleBinding
import java.text.SimpleDateFormat
import java.util.Locale


@RequiresApi(Build.VERSION_CODES.N)
class ServiceSchedule : AppCompatActivity() {
    private lateinit var binding : ActivityServiceScheduleBinding
    private var dateAndYear : String = ""
    private var time : String = ""


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityServiceScheduleBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val data = intent.extras
        val offeredBy = data!!.getString("offeredBy","")
        val price = data.getLong("price",0L)
        val descrption = data.getString("description","")
        val serviceName = data.getString("serviceName","")



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
                val intent = Intent(this,ConfirmServiceSchedule::class.java)
                intent.putExtra("offeredBy",offeredBy)
                intent.putExtra("description",descrption)
                intent.putExtra("price",price)
                intent.putExtra("serviceName",serviceName)

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