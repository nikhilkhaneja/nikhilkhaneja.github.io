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
    const fileSelect = document.querySelector('.js-fileSelect');
    const fileElem = document.querySelector('.js-fileElem');

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
        var user_id;
        user_id = user_id ? user_id : firebase.database().ref().child('multiple image-test' + id).push().key;
        var postData = 
        {
            Application_ID : id
        }
        updates['/post' + id] = postData;
        firebase.database().ref().child('multiple-image-test' +id ).update(updates);
        // once ALL the promises have been resolved
        // we console.log the urls...but we can do whatever we need to with this data 
        // from here
        Promise.all(fileUploads).then((items) => 
        {
            console.log(items);
        });      
    });
})();
