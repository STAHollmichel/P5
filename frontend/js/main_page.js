// Affichage des Cameras 

function displayCameraList(cameraList) {

  for (let camera of cameraList) {
    
    document.querySelector("#camera-container").insertAdjacentHTML("beforeend", `
      <div class="camera card ori-bg0 m-3" data-id="${camera._id}">
          <picture>
            <img src="${camera.imageUrl}" class="card-img-top" alt="camera home page display">
          </picture>
          <div class="card-body text-center">
          <h5 class="card-title">${camera.name}</h5>
          <p class="card-price p-1">Prix : ${camera.price /100},00 €</p>
          <a class="btn btn-outline-secondary" href="./product_page.html?id=${camera._id}">Voir Plus</a>
        </div>
      </div>`
    );
  }    
}

// Api Fetching
  
async function start() {

  let cameraList = await getCameraListFromAPI();
  
  displayCameraList(cameraList);
}

start();
