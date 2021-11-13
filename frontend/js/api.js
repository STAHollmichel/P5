// Fetching of all cameras @ backend

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

// Fetching of selected camera @ backend

async function getOneCameraFromAPI(id) { 
  let camera = await fetch(`http://localhost:3000/api/cameras/${id}`)
 .then( function (response) {
   if(response.ok) {
       return response.json();
     } else {
       console.log('error');
     }
   })
   .then(function (camera){
       console.log(camera);
     return camera;  // Camera call and their implementation on html
   }
 );
 return camera;
}
