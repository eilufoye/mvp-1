const express = require('express');
var jquery = require('jquery');
var admin = require("firebase");
var bodyParser = require('body-parser')

const path = require('path');
     var fs = require('fs');

var admin = require('firebase-admin');





try {
  // download serviceAccount.json from Firebase
  serviceAccount = require("firebasekey.json");
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: FIREBASE_DB_PATH
  })
} catch (err) {
  console.error('An error has occurred configuring Firebase')
}


// // create application/json parser
// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://honeybox-catalogue.firebaseio.com/'

// })






 
const app = express();

 

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))


// var scripts = document.getElementsByTagName("script");
console.log(__filename)






app.get('/', function(){
	res.render('jj');
 })





// console.log(admin.app().name);
//   var homecss = {
//          style : fs.readFileSync('public/style/home.css','utf8')
//      };
//  var logincss = {
//          style : fs.readFileSync('public/style/login.css','utf8')
//      };
// var dashcss = {
//   style: fs.readFileSync('public/css/dash.css','utf8')
// }

 app.get('/dash', function(req, res){

 	res.render('dash', {
 		title:'Dashboard'
 	})
 })

 app.get('/inventory', function(req, res){

 	res.render('inventory', {
 		title:'Dashboard'
 	})
 })




 app.get('/ppage', function(req, res){

 	res.render('product-page', {
 		title:'Product page'
 	})
 })


  app.get('/cart', function(req, res){

 	res.render('cart', {
 		title:'cart'
 	})
 })

   app.get('/checkout', function(req, res){

 	res.render('checkout', {
 		title:'checkout'
 	})
 })


app.get('/orderstatus', function(req, res){

 	res.render('orderstat', {
 		title:'order'
 	})
 })


  
 app.get('/register', function(req, res){

 	res.render('register', {
 		title:'register'
 	})
 })




app.get('/login', function (req, res) {
  // res.render('contact', {qs: req.query})
  // if (!req.body) return res.sendStatus(400)
  // res.send('welcome, ' + req.body.username)
 

    
    res.render('login', {
      title: 'auth site',
      // myCss: logincss
    });

})




// app.post('/auth', function(req, res){

// 	var token = req.body

// 	res.render(token)


		// 	// idToken comes from the client app
		// admin.auth().verifyIdToken(idToken)
		//   .then(function(decodedToken) {
		//     let uid = decodedToken.uid;
		//     // ...
		//   }).catch(function(error) {
		//     // Handle error
		//   });



// })


// app.post('/auth', async (req, res) => {
 	 


//   firebase.auth().currentUser.getIdToken().then(function (token) { 
//   /* same code */ 

//     }).catch(function (err) { 
//     	console.error('Error processing token: ' + err) 
//     })

// })




// app.post('/auth', async (req, res) => {
// 	console.log(req.body)
// 	console.log(res)
//   /* if you are using node >= 10 use the line below,
//      but use this: const token = req.body.customToken */
//   const { customToken: token } = req.body
//   let decodedToken = null
//   // For example check token
//   try { 
//      decodedToken = await admin.auth().verifyIdToken(token)
//   } catch (err) {
//      console.error('Error trying to verify the token: ' + err)
//      return res.status(403).json({ message: err.message })
//   }

//   return res.status(200).json({ token: decodedToken })
// })









 app.get('/profile', isLoggedIn, (req, res) => {
     res.render('profile', {
          user: req.user, isLoggedIn: req.isLogged
     });
});


function isLoggedIn(req, res, next) {
     if (req.isAuthenticated()) {
        req.isLogged = true
        return next();
     }
     res.redirect('/');
}


app.get('/forgot-password', function (req, res) {
  // res.render('contact', {qs: req.query})
  // if (!req.body) return res.sendStatus(400)
  // res.send('welcome, ' + req.body.username)
 

    
    res.render('forgot-password', {
      title: 'auth site',
      // myCss: logincss
    });

})




 

 

// app.post('/auth', urlencodedParser, function (req, res) {
//   // if (!req.body) return res.sendStatus(400)
//   // res.send('welcome, ' + req.body.username)
//     // console.log(req.body.email)
//     // console.log(req.body.password)
//     console.log(req.body)
//     res.render('home');

    

// })
// app.get('/dash', function (req, res) {
 
 
//       res.render('dash', {
//       title: 'dash ',
//       myCss: dashcss
//     });

    

// })

// app.get('/login', function (req, res) {
//   // res.render('contact', {qs: req.query})
//   // if (!req.body) return res.sendStatus(400)
//   // res.send('welcome, ' + req.body.username)
//     // console.log(req.body)
//     res.render('dash');
// })

// // app.get(['/','/index.html'], function(req, res) {

// //  	// res.sendFile(__dirname + '/public/index.html');

// //    res.render('home');
// //  });
 
// app.get(['/signup' ], function(req, res) {
//   // res.sendFile(__dirname + '/public/signUp.html');
//   // res.send('Lets do this STELLA!');
//   res.render('signup');
// });
// app.get(['/tos' ], function(req, res) {
//   // res.sendFile(__dirname + '/public/signUp.html');
//   // res.send('Lets do this STELLA!');
//   res.render('tos');
//   console.log("tos clicked")
// });

// app.get(['/forget-pass' ], function(req, res) {
//   res.sendFile(__dirname + '/public/forget-pass.html');
//   // res.send('Lets do this STELLA!');
// });




// // app.get('/css/style.css', function(req, res) {
// // 	res.sendFile((__dirname + '/public/css/style.css'));
// //   // res.send('Lets do this STELLA!');
// // });

// // app.get('/js/main.js', (req, res) => {
// // 	res.sendFile((__dirname + '/public/js/index.js'));
// //   // res.send('Lets do this STELLA!');
// // });



// // app.get(['/dash' ], function(req, res) {
// // 	res.sendFile(__dirname + '/public/dashb.html');
// //   // res.send('Lets do this STELLA!');
// // });



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});