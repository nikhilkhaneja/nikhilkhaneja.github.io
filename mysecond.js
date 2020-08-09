var user_id
fileButton.addEventListener('change',function(e){

	for(let i = 0;i<e.target.files.length;i++){

		var imageFile = e.target.files[i];
		var storageRef = firebase.storage().ref('Images/' + imageFile.name);
		var task = storageRef.put(imageFile);
		task.on('state_changed',function progress(snapshot){

			var percentage = snapshot.bytesTransferred/snapshot.totalBytes * 100;
			console.log("UPLOAD is"  + percentage + "% DONE");
			switch(snapshot.state){

				case firebase.storage.TaskState.PAUSED:
					console.log("Uplaod is paused");
					break;
				case firebase.storage.TaskState.RUNNING:
					console.log("Uplaod is runninh");
					break;
			}

			task.snapshot.ref.getDownloadURL().then( 
                function(downloadURL) { 
  
               // You get your url from here 
                console.log('File available at', downloadURL); 
  
              // print the image url  
               console.log(downloadURL); 
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

		})
		
	}

});
