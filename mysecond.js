var user_id;
function uploadFile()
{
  for(let i = 0;i<e.target.files.length;i++)
  {
    var imageFile = e.target.files[i];
    var id = Math.floor(Math.random() * (100000000000 - 0000000 + 1)) + 0000000;;
		var storageRef = firebase.storage().ref('/Images-' + id + '/' + imageFile.name);
		var task = storageRef.put(imageFile);
		task.on('state_changed',function progress(snapshot)
    { 
      var percentage = snapshot.bytesTransferred/snapshot.totalBytes * 100;
			console.log("UPLOAD is"  + percentage + "% DONE");
			switch(snapshot.state)
      {
				case firebase.storage.TaskState.PAUSED:
					console.log("Uplaod is paused");
					break;
				case firebase.storage.TaskState.RUNNING:
					console.log("Uplaod is running");
					break;
			}
			task.snapshot.ref.getDownloadURL().then(function(downloadURL) 
      { 
        console.log('File available at', downloadURL);   
        console.log(downloadURL); 
        $.fn.getFormData = function() 
        {
      		var fields = this.find('[name]');
      		var result = {};
      		$.each(fields, function (i, el) 
          {
        		result[el.name] = el.value;
      		});
      		return result;
    		};
    		var updates = {};
        user_id = user_id ? user_id : firebase.database().ref().child('user-data').push().key; 
        var postData = 
        {
          Image_URL : downloadURL,
        	Data:  $('form').getFormData()
        }
        updates['/post' + user_id] = postData;
        firebase.database().ref().child('user-data').update(updates);
      }); 
    });
	}
}
