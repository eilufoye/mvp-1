var CatalogueDB = firebase.database();
var CatalogueStorage = firebase.storage().ref();



console.log("home js")
//change text
var text = ["Reinvent", "Maximize"];
var counter = 0;
var elem = document.getElementById("changetext");
var inst = setInterval(change, 4000);

function change() {
  elem.innerHTML = text[counter];
  console.log(text[counter])
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}





  $('#signup-center').click(function () {
     console.log("hjsdhf")
   });
