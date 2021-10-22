// API fetching Response

function displayCameraList(cameraList) {
    for (let camera of cameraList){
        //Item Description
        document.getElementById('#card__specification').setAttribute("id", cameraList._id);
        document.getElementById('#card__img').src = cameraList.imageUrl;
        document.getElementById('#card__title').innerText = cameraList.name;
        document.getElementById('#card__price').innerText = "Prix : " + cameraList.price/100 + ",00 €";
        document.getElementById('#card__btn').setAttribute("id", cameraList._id);
    }             
}  
  async function start() { 
    let cameraList = await getCameraListFromAPI();
    displayCameraList(cameraList);
  }
  
  start();