(() => 
{ // protect the lemmings!
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
        
    // Create a child reference
    var id = Math.floor(Math.random() * (100000000000 - 0000000 + 1)) + 0000000;;
    document.getElementById("demo").innerHTML = id;

    const imagesRef = storageRef.child('multiple-image-' + id);
    // imagesRef now points to 'images'

    // select anchor tag and file input
    for(i=0;i<3;i++)
    {
    var str = '.js-fileSelect'+i;
    var str1 = '.js-fileElem'+i;
 	const fileSelect = document.querySelector(str);
    const fileElem = document.querySelector(str1);

    // click handler for fileElem
    fileSelect.addEventListener('click', (e) => 
    {
        e.preventDefault();

        // trigger click on input type="file"
        // this will call the change event defined below
        if (fileElem) 
        {
            fileElem.click();
        }
    });

    // change handler for fileSelect
    fileElem.addEventListener('change', (e) => 
    {
        // e.target.files contains File object references
        // to all chosen items by user
        console.log(e.target.files);

        // since e.target.files is "array-like", we turn it into an array
        // then map it to the .put() method from Firebase, which returns promises...
        const fileUploads = Array.from(e.target.files).map((currFile) => 
        {
        // we store the name of the file as a storage ref
            const fileRef = imagesRef.child(currFile.name);
            // we return a promise where we first "put" or upload the file
            // and then once the upload is complete, we return promise with
            // download URL string of the file we uploaded
            return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
        });
        var updates = {};
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                
 		var lat= position.coords.longitude
 		var lon = position.coords.latitude
        var user_id;
        var month = new Array();
        var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
        var d = new Date();;
        var tp = d.toUTCString();
        user_id = user_id ? user_id : firebase.database().ref().child('multiple image-test' + id).push().key;
        var postData = 
        {
            Application_ID : id,
            Latitude : lat,
            Longitude: lon,
            TimeStamp: tp
        }
        updates['/post--'+i] = postData;
        firebase.database().ref().child('multiple-image-test' +id ).update(updates);
        // once ALL the promises have been resolved
        // we console.log the urls...but we can do whatever we need to with this data 
        // from here
        Promise.all(fileUploads).then((items) => 
        {
            console.log(items);
        });   
                   });
        } 
       
    });
 }
       
})();


