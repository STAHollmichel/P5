async function getCameraListFromAPI() { 
    let cameraList = await fetch('http://localhost:3000/api/cameras')
   .then( function (response) {
     if(response.ok) {
         return response.json();
       } else {
         console.log('error');
       }
     })
     .then(function (cameraList){
         console.log(cameraList);
       return cameraList;  // Camera array call and their implementation on html
     }
   );
   return cameraList;
}