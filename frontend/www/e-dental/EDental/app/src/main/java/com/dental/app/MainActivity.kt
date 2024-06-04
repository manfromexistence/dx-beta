package com.dental.app

import android.content.DialogInterface
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.dental.app.databinding.ActivityMainBinding
import com.dental.app.ui.ChatFragment
import com.dental.app.ui.ConsultantFragment
import com.dental.app.ui.HomeFragment
import com.dental.app.ui.ProductFragment
import com.dental.app.ui.ProfileFragment
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.firestore
import com.google.firebase.messaging.FirebaseMessaging

class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding
    private lateinit var toggle: ActionBarDrawerToggle
    private lateinit var home : Fragment
    private val db = Firebase.firestore
    private val fragmentManager = supportFragmentManager


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = ""

        toggle = ActionBarDrawerToggle(this,binding.drawerLayout,binding.toolbar,R.string.open,R.string.close)
        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()


        binding.navigationView.setNavigationItemSelectedListener { menuItem ->


            // Handle navigation drawer item clicks here
            when (menuItem.itemId) {
//                1- hide the add doctor feature

//                R.id.addDentist -> {
//                    // Handle item 2 click
//                    startActivity(Intent(this@MainActivity,AddData::class.java))
//                    binding.drawerLayout.closeDrawers()
//                }


                R.id.exit -> {
                    showExitDialog()
                    binding.drawerLayout.closeDrawers()
                }
                // Add more cases for other items
            }
            true
        }


        home = HomeFragment()
        fragmentManager.beginTransaction().replace(R.id.frameLayout,home).commit()

        saveToken()

        binding.bottomNav.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.home -> {
                    val home = HomeFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, home).commit()
                }
                R.id.chats -> {
                    val recording = ChatFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
                }
                R.id.doctors -> {
                    val recording = ConsultantFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
                }
                R.id.products -> {
                    val recording = ProductFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
                }
                R.id.profile -> {
                    val recording = ProfileFragment()
                    fragmentManager.beginTransaction().replace(R.id.frameLayout, recording).commit()
                }
                else -> return@setOnNavigationItemSelectedListener false
            }
            true
        }

    }
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.toolbar_option, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.notification -> {
                // Handle search action
                startActivity(Intent(this@MainActivity,UpdateActivity::class.java))
                true
            }

            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun saveToken(){
            FirebaseMessaging.getInstance().token.addOnCompleteListener {
                if (it.isSuccessful){
                    val token = it.result
                    val data = hashMapOf(
                        "token" to token,
                        "uuid" to FirebaseAuth.getInstance().currentUser!!.uid
                    )
                    db.collection("tokens").document(FirebaseAuth.getInstance().currentUser!!.uid).set(data)
                    Log.d("token",token)
                } else {
                    Log.d("token","tokenNotFound")
                }
            }
    }


    private fun showExitDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Выйти из приложения")
            .setMessage("Вы уверены, что хотите выйти?")
            .setPositiveButton("Да") { _: DialogInterface, i: Int ->
                finishAffinity() // Close the app
            }
            .setNegativeButton("Нет") { dialogInterface: DialogInterface, i: Int ->
                dialogInterface.dismiss() // Dismiss the dialog
            }
            .show()
    }
}