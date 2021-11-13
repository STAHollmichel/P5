
function displayCamera(camera) {
       document.querySelector("#main-product-page").insertAdjacentHTML("beforeend", `
     <div class="camera-card" data-id="${camera._id}">
     <h1 class="card-title">${camera.name}</h1>
     <img src="${camera.imageUrl}" class="card-img-top" width="200px" alt="">
       <div class="camera-detail">
           <h5 class="card-title">${camera.name}</h5>
           <select id="lenses-list">${camera.lenses}</select>
           <p  class="card-price">Prix : ${camera.price /100},00 €</p>
           <form id="formProduct">
                    <div>
                        <button type="button" id="btn-less" class="btn" aria-label="button minus"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" class="quantity" min="1" max="10" id="quantityNumber" aria-label="desired quantity to add to basket"/>
                        <button type="button" id="btn-plus" class="btn" aria-label="button add"><i class="fas fa-plus-square"></i></button>
                    </div>
                    <small></small>
                    <button type="button" class="btn btn-warning" id="btn-sendToBasket" aria-label="final quantity to add to basket">Ajouter au panier</button>
                </form>
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
    //récupération du panier
    let basketOrder = JSON.parse(localStorage.getItem("basketItems"));
    const BtnSendToBasket = document.querySelector("#btn-sendToBasket"); //bouton écouté
    BtnSendToBasket.addEventListener("click", () => {
      addCameraToLocalStorage(camera);
      window.alert("Ajoutée au panier !");
    })         
  }
  
  start();


//récupération du panier


function addCameraToLocalStorage(camera) {
  if (localStorage.getItem("basket")) {
//  Si a déjà basket dans le local storage 
    const basketOrder = JSON.parse(localStorage.getItem("basket"))
    basketOrder.push(camera)
    localStorage.setItem("basket", JSON.stringify(basketOrder));
  }
  else {
    const basketOrder = [];
    basketOrder.push(camera)

    //on l'envoi au local storage
    localStorage.setItem("basket", JSON.stringify(basketOrder));
  }
}
