package com.dental.app.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dental.app.ConfirmSchedule
import com.dental.app.MessagingScreen
import com.dental.app.models.DentistModel
import com.dental.app.models.DoctorListModel
import com.dental.app.models.ScheduledServices
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.firestore.ktx.toObject
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import java.util.UUID

class UserDetailViewModel : ViewModel() {


    private val ref = Firebase.firestore

    suspend fun getUserData(uuid:String): ConfirmSchedule.UserDetails {
        val query = ref.collection("users").document(uuid).get().await()
        return query.toObject<ConfirmSchedule.UserDetails>()!!
    }


    private val _dentistDetail: MutableLiveData<DentistModel> = MutableLiveData()
    val dentistDetail : LiveData<DentistModel> get() = _dentistDetail

    suspend fun getDentist(uuid:String) {
        val query = ref.collection("dentists").whereEqualTo("uuid",uuid).get().await()
        if (!query.isEmpty) {
            for (data in query){
                val name = data.getString("name")
                val surname = data.getString("surname")
                val UUID = data.getString("uuid")
                val info = DentistModel(name,surname, UUID)
                _dentistDetail.value = info
            }
        } else {
           val indo = DentistModel("","","")
           _dentistDetail.value = indo
        }
    }

    suspend fun getUserFile(uuid:String): UserFile {
        val query = ref.collection("files").document(uuid).get().await()
        return query.toObject<UserFile>()!!
    }

    data class UserFile(val documentUrl : String = "", val filename : String = "")


}