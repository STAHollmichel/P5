
function displayCamera(camera) {
       document.querySelector("#main-product-page").insertAdjacentHTML("beforeend", `
     <div class="camera-card" data-id="${camera._id}">
     <h1 class="card-title">${camera.name}</h1>
     <img src="${camera.imageUrl}" class="card-img-top" width="200px" alt="">
       <div class="camera-detail">
           <h5 class="card-title">${camera.name}</h5>
           <select id="lenses-list">${camera.lenses}</select>
           <p  class="card-price">Prix : ${camera.price /100},00 €</p>
           <div id="btn-zone">
              <button type="button" class="btn btn-warning" id="btn-sendToBasket" aria-label="final quantity to add to basket">Ajouter au panier</button>
              <a href="./cart.html" class="btn btn-warning">Panier</a>
           </div>
         </div>
     </div>`
     );   
 }
  

  async function start() {
    const UrlParams = new URLSearchParams(window.location.search);
    const id = UrlParams.get("id"); 
    let camera = await getOneCameraFromAPI(id);
    displayCamera(camera);
    for (let cameraLenses of camera.lenses){
      document.querySelector("#lenses-list").innerHTML += 
      "<option>" + cameraLenses + "</option>";   
    }
    //envoi du item au panier panier
    let basketOrder = JSON.parse(localStorage.getItem("cartItems"));
    const BtnSendToCart = document.querySelector("#btn-sendToBasket"); //bouton écouté
    BtnSendToCart.addEventListener("click", () => {
      addCameraToLocalStorage(camera);
      window.alert("Ajoutée au panier !");
    })         
  }
  
  start();


// gestion de item dans le panier


function addCameraToLocalStorage(camera) {
  if (localStorage.getItem("cart")) {
//  Si a déjà cart dans le local storage 
    const cartOrder = JSON.parse(localStorage.getItem("cart"))
    cartOrder.push(camera)
    localStorage.setItem("cart", JSON.stringify(cartOrder));
  }
  else {
    const cartOrder = [];
    cartOrder.push(camera)

    //on l'envoi au local storage
    localStorage.setItem("cart", JSON.stringify(cartOrder));
  }
}

