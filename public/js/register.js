
       var accessToken = null;


firebase.auth().onAuthStateChanged((user) => {
    if (user) {

                       // window.location.assign("/dash")
 
        
    } else {

 
    }
})

$("#reguser").on('click', function() {
 
        Register()
})

$("#signin").on('click', function() {
    signin()

})


function signin (){


    var database = firebase.database();

    var password = document.getElementById('password').value;
    var email = document.getElementById('user-email').value;


 firebase.auth().signInWithEmailAndPassword(email, password)

 .then(function(firebaseUser) {
       // Success 
        


       // GET USER ID
 
       var uid = firebase.auth().currentUser.uid;

         mixpanel.track(
            "LogIn",
             {"User": uid}
        );

         var postData = {
            last_login: Date.now(),
             
            

        };
        var logData = {
            event: "Login",
            time: Date.now(),
            UserID: uid,
            

        };






        var updates = {};

        updates['/Users/' + uid+ "/last_login"] = Date.now();
        updates['/Log/' + '/Users/' + '/Login/' + uid] = logData;

        gotodash()

         firebase.database().ref().update(updates)

         $.getJSON('https://ipapi.co/json/', function(data) {

             var udi =data['ip'].replace(/./g, '')

              mixpanel.track(
            "Register",
             {"User": udi});


        })



       // gotohome()


   })
 .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

   if (errorCode ="auth/wrong-password") {
            document.getElementById("errmsg").innerHTML = "Wrong email or password."
          }

   // ...
  });


}


//Handle Account Creation

//Get User Info
//Create Acct
//Create user node
//Send token to server






function Register() {
    var database = firebase.database();
    var fname = document.getElementById('exampleFirstName').value;

    var cagecode = document.getElementById('cagecode').value.trim();
    var email = document.getElementById('exampleInputEmail').value;
    var password = document.getElementById('exampleInputPassword').value;

 

 
if (cagecode){

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
         
          if (error) {
             var errorCode = error.code;
             var errorMessage = error.message;

            displayerrors(errorMessage)
          }

              // if (email.length < 4) {

              //   alert('Please enter an email address.');
              //    return;
              // }
              // if (password.length < 4) {
              //     alert('Please enter a password.');
              //     return;
              // }


 


   // ...
            }).then(function(user) {
        var uid = firebase.auth().currentUser.uid;
        var auth = firebase.auth();
        var registrationdate = new Date().toLocaleString();


        var postData = {
            fname: fname,
            cagecode: cagecode,
            email: email,
            registrationdate: registrationdate,
            Accout_Created: Date.now(),

        };
        var logData = {
            event: "Registration",
            date: registrationdate,
            UserID: uid,
            User_email: email,

        };
       
     

        var updates = {};

        updates['/Users/' + uid] = postData;
        // updates['/Users/' + uid+ "/last_login"] = Date.now();

        updates['/Log/' + '/Users/' + '/Registration/' + uid] = logData;


        //Mixpanel 
        //    mixpanel.track(
        //     "New User",
        //      {"User": uid}
        // );

  
        firebase.database().ref().update(updates).then(sendEmailVerification())
        .then(gotodash(cagecode))


         $.getJSON('https://ipapi.co/json/', function(data) {

             var udi =data['ip'].replace(/./g, '')

              mixpanel.track(
            "Register",
             {"User": udi});


        })


        
        })


} else{

        var errorMessage ="Please enter your Cage Code."
        
        displayerrors(errorMessage)

 



}



  

         // } else {
         //     document.getElementById("errmsg").innerHTML = "Please complete check the policy box"
         //    }
    }


    function gotodash(cagecode) {



        var userObject = { 'usercage':cagecode  };

// Put the object into storage
        localStorage.setItem('userObject', JSON.stringify(userObject));



                window.location.assign("/dash")
            }

function displayerrors(errorMessage){

   document.getElementById("auth-err-msg-div").style.display = "block";

    document.getElementById("errmsg").innerHTML = errorMessage


}

 /** * Sends an email verification to the user.*/
function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }

function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }


