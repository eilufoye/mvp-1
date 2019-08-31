/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;

var productid = localStorage.productid





if (!localStorage["cart"]){


var totalitem = 0;

    var arrlength = 0;



} else {

    var cartarry = JSON.parse(localStorage["cart"]);


var totalitem = 0;

    for (var i = 0; i < cartarry.length; i++) {

        var totalitem =  totalitem + parseInt( cartarry[i].quantity)
    }


    


console.log(cartarry)


var arrayLength = cartarry.length;
for (var i = 0; i < arrayLength; i++) {

    var id = cartarry[i].id;

    var name = cartarry[i].name;
    var price = parseInt(cartarry[i].price.replace('$', ""))
    var quantity = parseInt(cartarry[i].quantity);
    var linetotal = price * quantity;
    var imgsrc = cartarry[i].imgsrc;
    console.log(cartarry[i].name);
    console.log( cartarry[i].availableqty);

    var itemcontainer = document.getElementById('myContent');
    // itemcontainer.innerHTML = '';
    getproduct();
}


}

// document.getElementById("checkout_items").innerHTML = totalitem; 


  


//Do something
function getproduct() {
    var itemcard = `
                        <div class="product" id="${id}">
                                  <div class="product-image">
                                    <img src=${imgsrc}>
                                  </div>
                                  <div class="product-details">
                                    <div class="product-title">Dingo Dog Bones</div>
                                    <p class="product-description"> ${name}</p>
                                  </div>
                                  <div class="product-price" id='productprice'>${price}</div>
                                  <div class="product-quantity">
                                    <input type="number" id='productquantity' value=${quantity} min="1">
                                    <p id="qty_max" style="font-size: 10px; color: red;"></p>
                                  </div>
                                  <div class="product-removal">
                                    <button class="remove-product">
                                      Remove
                                    </button>
                                  </div>
                          <div class="product-line-price" id='productlineprice' >${linetotal}</div>
                          </div>

                                  `;

    itemcontainer.innerHTML += itemcard;
    calculatelinetotal()
}

$(".checkout, .fa-shopping-cart").on("click", function(){

    

    window.location = "../html/cart.html"
})


//   }
// }


var database = firebase.database();

var HoneyBox_CatalogueDB = firebase.initializeApp(catalogueconfig, "CatalogueDB");
var Cataloguedatabase = HoneyBox_CatalogueDB.database();
var Cataloguestorage = HoneyBox_CatalogueDB.storage();

//             firebase.auth().onAuthStateChanged((user) => {
//               if (user) { 
//             var userid = firebase.auth().currentUser.uid;

//             var cartref = Cataloguedatabase.ref("/Carts/" +"/"+ userid);

//             cartref.on('value', fetchcart, errData);

//             function fetchcart(data){
//               var itemcontainer = document.getElementById('myContent');
//                itemcontainer.innerHTML = '';

//                       data.forEach(function(snapshot) {


//                         var id = snapshot.key;
//                         var items = snapshot.val();

//                         var itemcard = `
//                                     <div class="product" id="${id}">
//                                               <div class="product-image">
//                                                 <img src=${items.productimg}>
//                                               </div>
//                                               <div class="product-details">
//                                                 <div class="product-title">Dingo Dog Bones</div>
//                                                 <p class="product-description"> ${items.productname}</p>
//                                               </div>
//                                               <div class="product-price" id='productprice'>${items.price}</div>
//                                               <div class="product-quantity">
//                                                 <input type="number" id='productquantity' value=${items.quantity} min="1">
//                                               </div>
//                                               <div class="product-removal">
//                                                 <button class="remove-product">
//                                                   Remove
//                                                 </button>
//                                               </div>
//                                       <div class="product-line-price" id='productlineprice' >25.98</div>
//                                       </div>

//                                   `
//                         ;
//                         itemcontainer.innerHTML += itemcard;
//                         calculatetotal()

//                       }) 

//             }


// }
//  else {

//   window.location = '../html/auth.html'
// }
// })


// Search function

$("#searchbtn").on("click", function(){

  var seachvalue = document.getElementById('searchinput').value;
  console.log(seachvalue);


   // check for local storage 

        function storageON() {
                try {
                    localStorage.setItem("__test", "data");
                } catch (e) {
                    return false;
                } 
                return true;
            }

            if (storageON()) {
             /* DO SOMETHING */ 

             localStorage.searchcontent = seachvalue;

             console.log("search value saved to local storage  ")

           }

               // setCookie("shared", this.value, 1);
            // alert('oK, val changed so lets check it');              

    var currentUrl = window.location.href;
            
         url = currentUrl + encodeURIComponent(seachvalue);
         console.log(url)

         document.location.href = url;
         window.location= "../html/sch.html"

    });

function calculatelinetotal() {
    var price1 = document.getElementById('productprice').innerHTML;
    var quantity = document.getElementById('productquantity').value;




    var price = price1.replace('$', '')
    var total = parseInt(price * quantity);

    // document.getElementById('productlineprice').text() = total;
    document.getElementById('productlineprice').innerHTML = total;

    recalculateCart();

}

$('.checkout').click(function() {
    window.location = "/checkout"

    // console.log(this.id)
});

/* Assign actions */
$('.product-quantity input').change(function() {


    console.log($(this).parents('.product')[0].id)
    var id = $(this).parents('.product')[0].id;
    var classgroup = $(this).parents('.product')[0]

    var found = false;
    for (var i = 0; i < cartarry.length; i++) {
        if (cartarry[i].id == id) {
            found = true;

            console.log(cartarry[i].quantity)
            var availableqty = cartarry[i].availableqty
            for (var i = 0; i < classgroup.childNodes.length; i++) {


                if (classgroup.childNodes[i].className == "product-price") {

                    var quantity = parseInt($(this).val()); // get the new quantity here
                    var price = classgroup.childNodes[i].innerHTML

                    if (quantity <= availableqty){  // check if the changed quantity is not greater than what is available

                        document.getElementById('qty_max').innerHTML = ""

                          var idIndex = cartarry.map(function(x) {
                                return x.id;
                            }).indexOf(id); // find index of id
                            $.each(cartarry, function() {
                                if (this.id === id) {
                                    this.quantity = quantity; // update cartarray with the new quantity
                                }

                                localStorage.setItem('cart', JSON.stringify(cartarry)); // set the updated cart to local storage
                            })

                    } else { //display that limit message

                                    this.value = ""
                                    this.parentNode.getElementsByTagName('p')[0].innerHTML = "Please enter aquantity less than "+availableqty;

                                  
                        

                    }

                  
                }

                var linetotal = quantity * price;

                if (classgroup.childNodes[i].className == "product-line-price") {

                    classgroup.childNodes[i].innerHTML = linetotal; // update the new product line here
                }

                calculatelinetotal()
            }

        }
    }
});

function updateArray(key, index, value) {
    var array = JSON.parse(localStorage.getItem(key));
    array[idx] = value;
    localStorage.setItem(key, JSON.stringify(array));

}

$('.product-removal button').click(function() {
    console.log($(this).parents('.product')[0].id)
    var currentid = $(this).parents('.product')[0].id;

    console.log(cartarry)

    var idIndex = cartarry.map(function(x) {
        return x.id;
    }).indexOf(currentid); // find index of id
    var objectFound = cartarry[idIndex]; // this is complete object of found id

    cartarry.splice(idIndex, 1); // delete the index from array

    localStorage.setItem('cart', JSON.stringify(cartarry)); // update local storage of the removal
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function() {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(id) {
    /* Calculate line price */
    console.log(id)

    // var price = document.getElementById('myContent')

    // var price = $('#productprice').text();
    // var quantity = $(quantityInput).val();
    // var linePrice = price * quantity;
    // console.log(price,quantity)
    //  Update line price display and recalc cart totals 
    // $('.product-line-price').each(function () {
    //   $(this).fadeOut(fadeTime, function() {
    //     $(this).text(linePrice.toFixed(2));
    //     recalculateCart();
    //     $(this).fadeIn(fadeTime);
    //   });
    // });  
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    var productRowId = productRow.id;
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}




function errData(err) {
    console.log('Error!');
    console.log(err);
}