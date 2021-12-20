// Affichage de la cámera sélectionné

function displayCamera(camera) {

  document.querySelector("#main-product-page").insertAdjacentHTML("beforeend", `
    <div class="camera card col-md-8 col-lg-6 p-3 m-3 ori-bg0" data-id="${camera._id}" id="camera-card">
      <h1 class="card-title">${camera.name}</h1>
      <div class="card-container flex-lg-row">
        <picture>
          <img src="${camera.imageUrl}" class="card-img-top img-fluid rounded align-self-start" alt="camera product page image">
        </picture>
        <div class="camera-detail d-flex flex-column justify-content-between">
          <h5 class="card-title py-3">À propos de cet article</h5>
          <p class="card-text align-self-start">${camera.description}</p>
          <p class="font-italic ps-3 fw-b ">Objectifs de caméra: 
          <select id="lenses-list" class="mx-3">${camera.lenses}</select>
          </p>
          <div class="d-flex flex-row align-items-center">
            <p class="card-price ps-3 fw-sb"> ${camera.price /100},00 € </p>
            <i class="fas fa-tag lh-0 ps-1"></i>
          </div>
          <div id="btn-zone" class="align-self-end">
            <a href="./index.html" class="btn btn-outline-primary"><i class="fas fa-angle-left lh-0 pe-1"></i>Accueil</a>
            <button type="button" class="btn btn-outline-secondary" id="btn-sendToBasket" aria-label="add to cart">Ajouter<i class="fas fa-plus ps-1"></i></button>
            <a href="./cart.html" class="btn btn-outline-tertiary align-self-end"><i class="fas fa-shopping-basket"></i></a>
          </div>
        </div>
      </div>
    </div>`
  );   
 }
  
  // Api Fetching

async function start() {

  //Prendre l'ID de la caméra affiché dans le url

  const UrlParams = new URLSearchParams(window.location.search);
  const id = UrlParams.get("id"); 

  let camera = await getOneCameraFromAPI(id);
  displayCamera(camera);

  //Affichage des objectifs correspondants à chaque caméra

  for (let cameraLenses of camera.lenses){
    document.querySelector("#lenses-list").innerHTML += 
    "<option>" + cameraLenses + "</option>";   
  }

  // Activation d'ajout de la caméra au panier par le bouton ajouter

  const BtnSendToCart = document.querySelector("#btn-sendToBasket");
  BtnSendToCart.addEventListener("click", () => {
    addCameraToLocalStorage(camera);
    window.alert("Ajoutée au panier !");
  })         
}
  
  start();

  // Ajout de la caméra dans le panier

function addCameraToLocalStorage(camera) {

  // S'il y a déjà des caméras dans le panier, on continue à rajouter

  if (localStorage.getItem("cart")) {

    const cartOrder = JSON.parse(localStorage.getItem("cart"))
    cartOrder.push(camera)
    localStorage.setItem("cart", JSON.stringify(cartOrder));
  }

  // Si non, on crée un tableau vide et on met la caméra dedans

  else {
    
    const cartOrder = [];
    cartOrder.push(camera)
    localStorage.setItem("cart", JSON.stringify(cartOrder));
  }
}

