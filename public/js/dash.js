
var CatalogueDB = firebase.database();
var CatalogueStorage = firebase.storage().ref();



var userMetaData = {}

	// var fileinputelement = document.getElementById('filepond')

 



/*
We want to preview images, so we need to register the Image Preview plugin
*/
// FilePond.registerPlugin(
	
// 	// encodes the file as base64 data
//   FilePondPluginFileEncode,
	
// 	// validates the size of the file
// 	FilePondPluginFileValidateSize,
	
// 	// corrects mobile image orientation
// 	FilePondPluginImageExifOrientation,
	
// 	// previews dropped images
//   FilePondPluginImagePreview
// );


// Select the file input and use create() to turn it into a pond
// FilePond.create(fileinputelement)


//  const myPond = FilePond.create({
//     onprocessfilestart: (file) => {
//     	console.log("uploading.....")

//     },
//     onupdatefiles: (files) => {

//     	console.log("Updating..........")

//     }
// });  


// const inputElement = document.querySelector('input[type="file"]');
// const pond = FilePond.create(inputElement, {
//     onaddfilestart: (file) => { isLoadingCheck(); },
//     onprocessfile: (files) => { isLoadingCheck2(); }
// });

// function isLoadingCheck(){
//     var isLoading = pond.getFiles().filter(x=>x.status !== 5).length !== 0;
//     // if(isLoading) {
//     //     $('#createCaseForm [type="submit"]').attr("disabled", "disabled");
//     // } else {
//     //     $('#createCaseForm [type="submit"]').removeAttr("disabled");
//     // }


//     console.log("checking.......")
//         var fileinputelement = document.getElementById('filepond')
	

//     console.log("many files.......")
//     console.log(fileinputelement.target.files[0])

//     console.log(pond.getFiles()[0] )
// }



// function isLoadingCheck2(){
//     var isLoading = pond.getFiles().filter(x=>x.status !== 5).length !== 0;
//     // if(isLoading) {
//     //     $('#createCaseForm [type="submit"]').attr("disabled", "disabled");
//     // } else {
//     //     $('#createCaseForm [type="submit"]').removeAttr("disabled");
//     // }

//     var fileinputelement = document.getElementById('filepond')
	

//     console.log("many files.......")
//     console.log(fileinputelement.get(0).files[0])
// }

//=======START===========INITIALIZING ================START======================

// userMetaData['cagecode'] = "81755";

// var awardsref = CatalogueDB.ref("cageawards/" + userMetaData['cagecode']).orderByChild("Awarddate").limitToFirst(5);

// awardsref.on('value', Awardstable, errData);






// =============END ===========INITIALIZING===============END==============

 
// $('input[type="file"]').change(function(e){
// 	var file  = e.target.files[0] ;
//          handleFileUploadSubmit(file)
//  });

// function handleFileUploadSubmit(file) {
// 	console.log("...uploading file")
// 	// var uploadedFile =document.getElementById('inventory-file').target.files[0]

//   const uploadTask = CatalogueStorage.child(`Inventory-files/${userMetaData['uid']}/${file.name}`).put(file); //create a child directory called images, and place the file inside this directory
//   uploadTask.on('state_changed', (snapshot) => {
//   // Observe state change events such as progress, pause, and resume
//   }, (error) => {
//     // Handle unsuccessful uploads
//     console.log(error);
//   }, () => {
//      // Do something once upload is complete
//      console.log('success');
//   });
// }
function storeFileInStorage(file){


	// const file = fileinputelement.get(0).files[0] 



	 const name = (+new Date()) + '-' + file.name;
	  const task = CatalogueStorage.child(name).put(file, metadata);

}









$("#submituserinput").on('click', function() {

	//Get user data 

	storeUser()

	//Display table 
 

	document.getElementById('userinput').style.display = 'none';

 	document.getElementById('productTable').style.display = 'block';




  // var awardsref = CatalogueDB.ref("cageawards/" + userMetaData['cagecode']).orderByChild("Awarddate").limitToFirst(5);

   // awardsref.on('value', RecommendItemTable, errData);


})

function storeUser(){

	//new inventory

	var day = document.getElementById('availableDay').value;
	var time = document.getElementById('userTime').value;
	var PhNum = document.getElementById('userNumber').value;
    var datenow = new Date().toLocaleString();

	var BookInventory= {
		dayAvailable: day,
		timeAvailable: time,
		phoneNum: PhNum,
		dateNTime: datenow,

		time: Date.now()
	}


 
        var updates = {};

        updates['/NewInventory-uid/' + userMetaData['uid']] = BookInventory;
 
 
        firebase.database().ref().update(updates).then(function() {

        	var summry ={

        		inventoryBooked: "Yes",
        		timeInventoryBooked: Date.now(),
        		date:new Date().toLocaleString()
        	}
        	var updates ={};


        	updates['/UserSummary-uid/' + userMetaData['uid']] = summry;

        	firebase.database().ref().update(updates)

        	 
        	$('#newAcctModal').modal('hide')

        })

        

}

// Retrieve the object from storage
var retrievedcage = localStorage.getItem('userObject')["usercage"];





userMetaData['cagecode'] = retrievedcage;


var changethis = 'InventoryRequestSubmited'


if (changethis === 'InventoryRequestSubmited') {


	$('#newAcctModal').modal('show')
  $('#newAcctModal').modal({backdrop: 'static', keyboard: false})  

    // variable is undefined
}


// ===== START ========== NEW ACCT ========= START =======











// ====== END ========= NEW ACCT ========= END =======







//================== INITIALIZING ============================================================================


				firebase.auth().onAuthStateChanged((user) => {
				    if (user) {

				        //   mixpanel.track(
				        //     "DashBoard",
				        //     // {"genre": "hip-hop"}
				        // );
				        database = firebase.database();
				        var BusinessesId = firebase.auth().currentUser.uid;
				        userMetaData['uid'] =BusinessesId;

				 
				        // var cagecode = "33436";


				  //=====================GET USER DATA =================================================================================

				         var userRef = CatalogueDB.ref('/Users/' + BusinessesId)
                 var userCageRef =CatalogueDB.ref('/cagecodes/' + userMetaData['cagecode'])

                 userCageRef.on("value", function(usercagesnapshot){
                  var usercageData = usercagesnapshot.val()
                  var keys = Object.keys(usercageData)

                   for (var i = 0; i < keys.length; i++) {
                    userMetaData[keys[i]]=usercageData[keys[i]]
                   }
                   document.getElementById('vendorName').innerHTML = userMetaData['VendorName']


                  // userMetaData.push(usercageData)
 
                 })

				         userRef.on("value", function(usersnapshot){

				        var userData = usersnapshot.val()
				         var userCage = userData.cagecode
				        var userLastLogin = userData.last_login
				        var inventoryCheck = userData.InventoryCreated

				                    userMetaData['uid'] = BusinessesId
				                    userMetaData['cagecode'] = userCage



				        if (userLastLogin) {

				                    userMetaData['last_login'] = userLastLogin



				        }

				        if (inventoryCheck){ 

				        }else{

				             $('#welcomeModal').modal({show: true});
				                $('#welcomeModal').modal({
				                    backdrop: 'static',
				                    keyboard: false
				                })

				        }

				    
				    var userRef1 = CatalogueDB.ref('/cagecodes/' + userMetaData['cagecode'])
				             userRef1.on("value", function(usersnapshot){

				    })



				        userMetaData['cagecode'] = "81755";

                var RFQinInventoryRef = CatalogueDB.ref("RFQinInventory_NSN_cage")

				        var awardsref = CatalogueDB.ref("cageawards/" + userMetaData['cagecode']).orderByChild("Awarddate").limitToFirst(1);

				        awardsref.on('value', Awardstable, errData);

                // GET RFQ MATCHES IN INVENTORY

                // RFQinInventoryRef.on('value', RFQMatchesTable, errData);




				        var cageref = CatalogueDB.ref("cageawards/" + userCage);

				        var vendorInventoryref = CatalogueDB.ref("Inventory/" + BusinessesId)
				        var requestRef = CatalogueDB.ref("UserRequests/" + BusinessesId)
				        // cageref.on('value', pullInventory, inventoryError);

				        // GET CAGE AWARDS

				        cageref.on("value", function(snapshot) {

				            if (snapshot.val() == null) {

				                // noCageCodeFound(userCage)
				                // alert("cage not found")

				                //log this
				 
				            } else {

				                            pullInventory(snapshot)
				            }
				 
				          
				        }, function (errorObject) {
				          console.log("The read failed: " + errorObject.code);
				        });

				        //GET VENDOR INVENTORY
				        vendorInventoryref.on("value", function(snapshot) {

				            if (snapshot.val() == null) {


				            }else {

				                pullVendorInventory(snapshot)
				            }
				        })


				         requestRef.on("value", function(snapshot) {

				            if (snapshot.val() == null) {


				            }else {

				                pullRequests(snapshot)
				            }
				        })
				        });

				         //===========END OF USER DATA============================================================

				    } else {

				                          // window.location.assign("../auth/login.html")

				    }
				})



 








//========START===============================BUY FROM VENDOR =====================================START=================================================================================================================================================================================================================


//============BUY MODAL ===================//





function RFQMatchesTable(data){


  var container = document.getElementById('flexbox')
  container.innerHTML ="";

  data.forEach(function(rfqSnap){

    var rfqitems =rfqSnap.val();







  })





}










function Awardstable(data) {
 
    var container = document.getElementById('dibbsRecentAwards');
    container.innerHTML = '';

    data.forEach(function(awardsSnap) { // loop over all inventory

        


        var Items = awardsSnap.val();
 

        var nome = Items.Nomenclature;
        var NSN = Items.NSN;
        var AwardId = Items.Awardid;
        var AwrdDate = Items.Awarddate;
        var name = Items.Name;
        // var quant = Items.Qty;
        var cost = Items.Price;
        var key = awardsSnap.key;

// FOR EACH NSN FIND PREVIOUS SELLERS 

        var NSNref = CatalogueDB.ref("Suppliers/" + NSN).orderByChild("NSN");

        if (NSNref) {

            // Attach an asynchronous callback to read the data at our posts reference
            NSNref.on("value", function(nsnshot) {
                var otherNSNSuppliers = nsnshot.val()
                
                var otherNSNSuppliersKeys = Object.keys(otherNSNSuppliers);

                  // otherNSNSuppliers[userMetaData['cagecode']]

                 delete otherNSNSuppliers[userMetaData['cagecode']]

                 var nsndatalength = Object.keys(otherNSNSuppliers).length;
           


                // var nsndatalength = nsnshot.val().length
                if (nsndatalength >= 1) {

               

                    // container.innerHTML = ""

                    var inventoryCard = `
                    


                                             <tr>
                                                         <th scope="row">${NSN}</th>
                                                         <td>${nome}</td>
                                                         <td>${AwardId}</td>
                                                         <td>${AwrdDate}</td>
                                                         <td class="color-danger">${cost}</td>
                                                		 
                                                		   <td>

                                                <span class="badge badge-success" id="sellerqty-${AwardId}">${nsndatalength} Sellers</span>
                                                </td>

                                                         <td>
                                                             <button type="button" class=" btn btn-primary buybtn" id="getVendors">
                                                                 ${nsndatalength} Vendors
                                                             </button>
                                                         </td>
                                                     </tr>


                        `;

                    container.innerHTML += inventoryCard;
                } else {

                    nsndatalength = 0;


                    var inventoryCard = `
                          <tr>
                                                <th scope="row">${NSN}</th>
                                                <td>${nome}</td>
                                                <td>${AwardId}</td>
                                                <td>${AwrdDate}</td>
                                                <td class="color-danger">${cost}</td>
                                                <td>

                                                <span class="badge badge-success" id="sellerqty-${AwardId}">${nsndatalength} Sellers</span>
                                                </td>
                                                  <td>
                                                  <button type="button" class="btn btn-secondary buybtn" id="buymodalbtn-${AwardId}" data-toggle="modal" data-target="#buyModal" onclick="newSellerModal('${NSN}')">
                          Ask A Vendor
                      </button></td>
                                            </tr>
                        `;

                    container.innerHTML += inventoryCard;

                }
            })
        } else {
            nsndatalength = 0;
            console.log("No Awards Available")
        }

    });

}









$("#add-to-cart-btn").on('click', function() {
 
	window.location.assign("cart.html")
})

$("#getVendors").on('click', function() {
  
	window.location.assign("/ppage")
})




//========END===============================BUY FROM VENDOR =====================================END==================================================================================================================================================================================================================================================================================



//=======================================ASK A VENDOR ======================================================================================================================================================================================================================================================================================================================

$("#askVendor").on('click', function() {
 
	console.log('Ask A Vendor')
})

function askAVendor(){



}








//========END===============================ASK A VENDOR =====================================END==================================================================================================================================================================================================================================================================================


//=======================================SAVE QUOTE ======================================================================================================================================================================================================================================================================================================================

$(".RFQ_content").on('click', function() {

    $('#exampleModalCenter').modal('show')
 })

// function askAVendor(){



// }








//========END===============================SAVE QUOTE =====================================END==================================================================================================================================================================================================================================================================================







function RecommdItemTable(data) {
 
    var container = document.getElementById('RecommdItem');
    container.innerHTML = '';

    data.forEach(function(awardsSnap) { // loop over all inventory

        
        var Items = awardsSnap.val();
 

        var nome = Items.Nomenclature;
        var NSN = Items.NSN;
        var AwardId = Items.Awardid;
        var AwrdDate = Items.Awarddate;
        var name = Items.Name;
        // var quant = Items.Qty;
        var cost = Items.Price;
        var key = awardsSnap.key;

// FOR EACH NSN FIND PREVIOUS SELLERS 

        var NSNref = CatalogueDB.ref("Suppliers/" + NSN).orderByChild("NSN");

        if (NSNref) {

            // Attach an asynchronous callback to read the data at our posts reference
            NSNref.on("value", function(nsnshot) {
                var othernsnsuppliers = nsnshot.val()
                console.log(othernsnsuppliers)
                 
                
                 var nsndatalength = Object.keys(othernsnsuppliers).length;
          
                // var nsndatalength = nsnshot.val().length
                if (nsndatalength >= 1) {


                    // container.innerHTML = ""

                    var inventoryCard = `
                          <tr>
                                                <th scope="row">${NSN}</th>
                                                <td>${nome}</td>
                                                <td>${AwardId}</td>
                                                <td>${AwrdDate}</td>
                                                <td class="color-danger">${cost}</td>
                                                <td>

                                                <span class="badge badge-primary" id="sellerqty-${AwardId}">${nsndatalength} Sellers</span>
                                                </td>
                                                  <td><button type="button" class="btn btn-warning" id="buymodalbtn-${AwardId}" data-toggle="modal" data-target="#buyModal" onclick="buyModal('${NSN}','${nome}')" style="width:110px;">
                          Buy
                      </button></td>
                                            </tr>


                        `;

                    container.innerHTML += inventoryCard;
                } else {

                    nsndatalength = 0;
                    var inventoryCard = `
                          <tr>
                                                <th scope="row">${NSN}</th>
                                                <td>${nome}</td>
                                                <td>${AwardId}</td>
                                                <td>${AwrdDate}</td>
                                                <td class="color-danger">${cost}</td>
                                                <td>

                                                <span class="badge badge-success" id="sellerqty-${AwardId}">${nsndatalength} Sellers</span>
                                                </td>
                                                  <td>
                                                  <button type="button" class="btn btn-success" id="buymodalbtn-${AwardId}" data-toggle="modal" data-target="#buyModal" onclick="newSellerModal('${NSN}')">
                          Ask A Vendor
                      </button></td>
                                            </tr>
                        `;

                    container.innerHTML += inventoryCard;

                }
            })
        } else {
            nsndatalength = 0;
            console.log("No Awards Available")
        }

    });

}


// function uploadfile(evt){

 
    $(".fileButton").on('change', function(e){
      var uid = this.id
      var uploader = document.getElementById('uploader'+uid);


   var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+userMetaData['cagecode']+"/" +file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;


     uploader.value = percentage;

  }, function error(err) {


  },function complete() {
     


  });


})

   

// }











 $.getJSON('https://ipapi.co/json/', function(data) {

             var udi =data['ip'].replace(/./g, '')

              mixpanel.track(
            "DashBoard",
             {"User": udi});


        })








function errData(){

}


