
fileButton.addEventListener('change',function(e){

	for(let i = 0;i<e.target.files.length;i++){

		var imageFile = e.target.files[i];
		var storageRef = firebase.storage().ref('Images' + imageFile.name);
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
         
            }); 

		})
		
	}

});