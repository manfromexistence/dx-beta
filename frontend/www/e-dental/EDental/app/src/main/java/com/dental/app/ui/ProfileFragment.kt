package com.dental.app.ui

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.lifecycle.ViewModelProvider
import com.dental.app.LoginScreen
import com.dental.app.databinding.FragmentProfileBinding
import com.dental.app.viewmodels.UserDetailViewModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.ktx.storage
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.io.File
import java.lang.reflect.InvocationTargetException


class ProfileFragment : Fragment() {

    private var _binding : FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private lateinit var viewModel : UserDetailViewModel
    private val db = FirebaseFirestore.getInstance()
    private var isFileUploaded : Boolean = false
    private var selectedDocumentUri : Uri? = null
    private var userName : String = ""
    private var documentUri : String = ""
    private var fileName : String = ""

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentProfileBinding.inflate(layoutInflater,container,false)
        viewModel = ViewModelProvider(this)[UserDetailViewModel::class.java]


        scope.launch {
            try {
                val user = viewModel.getUserData(FirebaseAuth.getInstance().currentUser!!.uid)
                binding.patientName.text = "${user.name} ${user.surname}"
                userName = user.name
                binding.dob.text = user.age
                binding.patientRole.text = user.gender
                binding.city.text = user.city
                binding.email.text = user.email

                if (user.uuid == "null"){
                    val db = FirebaseFirestore.getInstance()
                    val docRef = db.collection("users").document(FirebaseAuth.getInstance().currentUser!!.uid)
                    val updates = hashMapOf<String, Any>(
                        "uuid" to FirebaseAuth.getInstance().currentUser!!.uid )

                    docRef.update(updates)
                        .addOnSuccessListener {
                           println("field updated successfully")
                        }
                        .addOnFailureListener { e ->
                            // Handle any errors
                            // Log.e(TAG, "Error updating document", e)
                            println("field updated successfully")
                        }
                }

            } catch (e : NullPointerException){
                e.printStackTrace()
            } catch (e : InvocationTargetException){
                e.printStackTrace()
            }
        }

        scope.launch {
            try {
                val user = viewModel.getUserFile(FirebaseAuth.getInstance().currentUser!!.uid)
                if (user.filename == ""){
                    isFileUploaded = false
                    binding.file.text = "Загрузить документ   "
                } else {
                    isFileUploaded = true
                    binding.file.text = "Ваш документ"
                    documentUri = user.documentUrl
                    fileName = user.filename
                }
            } catch (e : NullPointerException){
                e.printStackTrace()
            } catch (e : InvocationTargetException){
                e.printStackTrace()
            }
        }

        Log.d("fileName",fileName)

        binding.file.setOnClickListener {
            if (isFileUploaded){
                Toast.makeText(requireContext(),"Ваш документ уже загружен.",Toast.LENGTH_SHORT).show()
            } else {
                selectDocument.launch("application/pdf")
            }
        }


        binding.logout.setOnClickListener {
            FirebaseMessaging.getInstance().deleteToken().addOnCompleteListener {
                if (it.isSuccessful){
                    FirebaseAuth.getInstance().signOut()
                    removeLogin()
                    startActivity(Intent(requireContext(),LoginScreen::class.java))
                    requireActivity().finishAffinity()
                }
            }
        }

        return binding.root
    }

    private fun uploadDocumentToFirestore(uri: Uri) {
        val storage = FirebaseStorage.getInstance()
        val storageRef = storage.reference
        val fileName = "$userName.pdf"
        val articleStorageRef = storageRef.child("files").child("documents/$fileName")

        articleStorageRef.putFile(uri)
            .addOnSuccessListener {
                articleStorageRef.downloadUrl.addOnCompleteListener { task ->

                    val link = task.result.toString()
                    saveInDatabase(link,userName)

                }
            }
            .addOnFailureListener { it: Exception ->
                // Handle unsuccessful uploads
                println("Error uploading document: $it")
            }
    }

    private val selectDocument = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let {
            selectedDocumentUri = it
            uploadDocumentToFirestore(selectedDocumentUri!!)
        }
    }

    private fun saveInDatabase(documentUrl : String, filename : String){
        val info = hashMapOf(
            "documentUrl" to documentUrl,
            "filename" to "$filename.pdf",
            "uuid" to FirebaseAuth.getInstance().currentUser!!.uid
        )
        scope.launch {
            db.collection("files").document(FirebaseAuth.getInstance().currentUser!!.uid)
                .set(info).addOnSuccessListener {
                    Toast.makeText(requireContext(),"Документ успешно загружен",Toast.LENGTH_SHORT).show()
                    binding.file.text = "$userName's документ"
                    isFileUploaded = true
                }.addOnFailureListener {
                    println("Error uploading file: $it")
                }
        }
    }

    private fun sharePdfFromFirebase() {
        val storage = Firebase.storage
        val storageRef = storage.reference
        val fileName = "$userName.pdf" // Replace with your file name

        val localFile = File.createTempFile("temp", "pdf")

        storageRef.child("documents/$fileName").getFile(localFile)
            .addOnSuccessListener {
                // File downloaded successfully
                val uri = Uri.fromFile(localFile)
                sharePdf(uri)
            }
            .addOnFailureListener { exception ->
                // Handle any errors
                println("Error downloading file: $exception")
            }
    }

    private fun sharePdf(uri: Uri) {
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "application/pdf"
        intent.putExtra(Intent.EXTRA_STREAM, uri)
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

        try {
            startActivity(Intent.createChooser(intent, "Share PDF"))
        } catch (e: ActivityNotFoundException) {
            println("No application available to view PDF")
        }
    }

    private fun removeLogin() {
        val sharedPreferences = requireContext().getSharedPreferences("Login", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.remove("isLogin")
        editor.apply()

    }

}