package com.dental.app.adddata

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.dental.app.DeleteProducts
import com.dental.app.R
import com.dental.app.databinding.FragmentAddProductBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.storage.FirebaseStorage
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.util.UUID


class AddProductFragment : Fragment() {

    private var _binding : FragmentAddProductBinding? = null
    private val binding get() = _binding!!

    private var productUri : Uri? = null
    private var productPicURL : String? = null
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private val PICK_IMAGE_REQUEST = 100
    private val db = FirebaseFirestore.getInstance()



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentAddProductBinding.inflate(inflater,container,false)

        val storage = FirebaseStorage.getInstance()
        val storageRef = storage.reference
        val articleStorageRef = storageRef.child("product_images").child(getOutputFilePath().trim())

        binding.addImage.setOnClickListener {
            openFileChooser(PICK_IMAGE_REQUEST)
        }

        binding.myProducts.setOnClickListener {
            startActivity(Intent(requireContext(),DeleteProducts::class.java))
        }

        binding.addDentistServiceButton.setOnClickListener {
            binding.progressBar.visibility = View.VISIBLE

            scope.launch {
                val productName = binding.productName.text.toString().trim()
                val productPrice = binding.price.text.toString()
                val description = binding.description.text.toString()
                val brand = binding.brand.text.toString()

               if (productName.isNotEmpty() && brand.isNotEmpty() && productPrice.isNotEmpty() && description.isNotEmpty()&& productUri != null){

                   articleStorageRef.putFile(productUri!!)
                       .addOnSuccessListener {

                           articleStorageRef.downloadUrl.addOnCompleteListener { task ->
                               val url = task.result.toString()
                               productPicURL = url

                               val data = hashMapOf(
                                  "productName" to productName,
                                  "productPrice" to productPrice.toInt(),
                                  "description" to description,
                                  "pID" to generateRandom().toString(),
                                  "uuid" to FirebaseAuth.getInstance().currentUser!!.uid,
                                  "brand" to brand,
                                  "url" to url
                               )

                               db.collection("products").document().set(data).addOnSuccessListener {
                                    clearText()
                                   Toast.makeText(requireContext(), "Продукт успешно добавлен", Toast.LENGTH_LONG).show()
                                   binding.progressBar.visibility = View.GONE
                                   binding.addImage.setImageResource(R.drawable.add)
                               }.addOnFailureListener {
                                   Toast.makeText(requireContext(),"произошла ошибка!",Toast.LENGTH_SHORT).show()
                                   binding.progressBar.visibility = View.GONE
                               }

                           }
                       }
                       .addOnFailureListener { it: Exception ->
                           // Handle unsuccessful uploads
                           Toast.makeText(requireContext(), it.localizedMessage, Toast.LENGTH_LONG).show()
                           binding.progressBar.visibility = View.GONE
                           clearText()
                       }

               }else {
                   Toast.makeText(requireContext(),"пожалуйста, заполните все поля!",Toast.LENGTH_SHORT).show()
                   binding.progressBar.visibility = View.GONE
               }
            }
        }

        return binding.root
    }

    private fun openFileChooser(code : Int) {
        val intent = Intent()
        intent.setType("image/*")
        intent.setAction(Intent.ACTION_GET_CONTENT)
        startActivityForResult(intent, code)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == AppCompatActivity.RESULT_OK && data != null && data.data != null) {
            productUri = data.data
            binding.addImage.setImageURI(productUri)
        }
    }

    private fun getOutputFilePath(): String {
        return UUID.randomUUID().toString()
    }

    private fun generateRandom() : Int{
        var num = 0
        scope.launch {
            val random = (100000..999999).random()
            num = random
        }
        return num
    }

    private fun clearText(){
        binding.productName.text.clear()
        binding.price.text.clear()
        binding.description.text.clear()
        binding.brand.text.clear()

        productPicURL = ""
        productUri = null
    }



    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
        scope.cancel()
    }

}