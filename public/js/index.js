// var text = ["Welcome", "Hi", "Sup dude"];
// var counter = 0;
// var elem = document.getElementById("changetext");
// var inst = setInterval(change, 1000);

// function change() {
//   elem.innerHTML = text[counter];
//   counter++;
//   if (counter >= text.length) {
//     counter = 0;
//     // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
//   }
// }



// =============== Dashboard =======//

var CatalogueDB = firebase.database();
var CatalogueStorage = firebase.storage().ref();


! function(o) {
    "use strict";
    o("body").on("input propertychange", ".floating-label-form-group", function(i) {
        o(this).toggleClass("floating-label-form-group-with-value", !!o(i.target).val())
    }).on("focus", ".floating-label-form-group", function() {
        o(this).addClass("floating-label-form-group-with-focus")
    }).on("blur", ".floating-label-form-group", function() {
        o(this).removeClass("floating-label-form-group-with-focus")
    });
    if (992 < o(window).width()) {
        var s = o("#mainNav").height();
        o(window).on("scroll", {
            previousTop: 0
        }, function() {
            var i = o(window).scrollTop();
            i < this.previousTop ? 0 < i && o("#mainNav").hasClass("is-fixed") ? o("#mainNav").addClass("is-visible") : o("#mainNav").removeClass("is-visible is-fixed") : i > this.previousTop && (o("#mainNav").removeClass("is-visible"), s < i && !o("#mainNav").hasClass("is-fixed") && o("#mainNav").addClass("is-fixed")), this.previousTop = i
        })
    }

   

}(jQuery);
  $('.yesgov').click(function () {
        console.log("yes")
           document.getElementById("govinput").style.display = "block";
       });

//change text
var text = ["Reinvent", "Maximize"];
var counter = 0;
var elem = document.getElementById("changetext");
var inst = setInterval(change, 4000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}

  $('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });


  //=======Dashboard===========//




  $('.signIn').click(function () {
         window.location.href ="/register"

        });

  $('.logIn').click(function () {
         window.location.href ="/login"

        });


$.getJSON('https://ipapi.co/json/', function(data) {
  // console.log(JSON.stringify(data, null, 2));
  var sessionData = JSON.stringify(data, null, 2)
   var udi =data['ip'].replace(/./g, '')

   var datenow = Date.now()

   var updates = {};

        updates['/PreMVP_visit_Time/'+datenow] = data;
        updates['/PreMVP_visit_IP/'+ udi+datenow] = data;

 
       firebase.database().ref().update(updates)


         mixpanel.track(
            "home",
             {"User": udi}
        );



});




 



