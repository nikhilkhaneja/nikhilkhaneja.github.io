function move()
{
const config = 
    {
        apiKey: "AIzaSyBdN76fdS0vIOWyots_5YNcbvuk1WbG2aE",
        authDomain: "howdy-27dd6.firebaseapp.com",
        databaseURL: "https://howdy-27dd6.firebaseio.com",
        projectId: "howdy-27dd6",
        storageBucket: "howdy-27dd6.appspot.com",
        messagingSenderId: "310611162979",
        appId: "1:310611162979:web:cf1cbccd16787f6e48c556",
        measurementId: "G-5EB12TGK2N"
    };
    firebase.initializeApp(config);
        
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();

    // Create a storage reference from our storage service
    const storageRef = storage.ref();
    $('#ist').find('tbody').html('');

var i = 0;

var fn = document.getElementById("ap_id").value;
storageRef.child('multiple-image-'+fn+'/').listAll().then(function(result){

  result.items.forEach(function(imageRef){

    console.log("IMAge Reference" + imageRef.toString())

    i++;
    displayImage(i, imageRef);


  });

});
function displayImage(row, images){
  var new_html = '';
  images.getDownloadURL().then(function(url){

      new_html += "<div>";
      new_html += '<img width = "500" height = "500" src = '+url+'>';
      new_html += "</div>";

      $('#ist').find('tbody').append(new_html);
  });
}

  }