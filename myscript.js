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
    var elem = document.getElementById("myBar");   
    var width = 1;
    var id = setInterval(frame, 40);
    function frame() 
    {
        if (width >= 100) 
        {
            clearInterval(id);
            
            const storage = firebase.storage();
            const storageRef = storage.ref();
            $('#ist').find('tbody').html('');

            var new_htm = '';
          new_htm = '<h3 style= "background-color:red;text-align : center;margin-left:-250px"class="mbr-section-subtitle align-center pb-5 mbr-light mbr-fonts-style display-5">The Images Retrieved are:</h3>';
            $('#ist').find('tbody').append(new_htm);

            var i = 0;

            var fn = document.getElementById("ap_id").value;
            storageRef.child('multiple-image-'+fn+'/').listAll().then(function(result)
            {
                result.items.forEach(function(imageRef)
                {
                    console.log("IMAge Reference" + imageRef.toString())

                    i++;
                    displayImage(i, imageRef);  
                });

            });
            function displayImage(row, images)
            {
                var new_html = '';
                images.getDownloadURL().then(function(url)
                {
          
                    new_html += '<div style= "text-align : center">';
                    new_html += '<img width = "270" height = "270" src = '+url+'>';
                    new_html += '<br><br>';
                    new_html += "</div>";

                    $('#ist').find('tbody').append(new_html);
                });
            }
        } 
        else 
        {
            width++; 
            elem.style.width = width + '%'; 
        }
    } 
}
