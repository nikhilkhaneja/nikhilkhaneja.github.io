var user;
var selectedFile;

$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});

function uploadFile() {
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/Images/' + filename);
	var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // See below for more detail
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		var str;
	 
	  	var user_id;
	 	 var url;
	  	var caption;
 	  	uploadTask.snapshot.ref.getDownloadURL().then( 
        	function (downloadURL) { 
        	$.fn.getFormData = function() {
      			var fields = this.find('[name]');
      			var result = {};
      			$.each(fields, function (i, el) {
        			result[el.name] = el.value;
      			});
      		return result;
    		};
        	var updates = {};
        	user_id = user_id ? user_id : firebase.database().ref().child('user-data').push().key;
        	console.log('File available at', downloadURL); 
        	tr = downloadURL;
        	console.log(downloadURL); 
        	var postData = {
        		Image_URL : downloadURL,
        		Data:  $('form').getFormData()
        	}
        	updates['/post' + user_id] = postData;
        	firebase.database().ref().child('user-data').update(updates);
	 	});
 	});
}



		
