
function displayCamera(camera) {
       document.querySelector("#main-product-page").insertAdjacentHTML("beforeend", `
     <div class="camera-card" data-id="${camera._id}">
     <h3 class="card-title">${camera.name}</h3>
     <img src="${camera.imageUrl}" class="card-img-top" width="200px" alt="">
       <div class="camera-detail">
           <h5 class="card-title">${camera.name}</h5>
           <select id="lenses-list"><!--lenses choice list-->
                </select>
           <p  class="card-price">Prix : ${camera.price /100},00 €</p>
           <form id="formProduct">
                    <div>
                        <button type="button" id="btn-less" class="btn" aria-label="button minus"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" class="quantity" min="1" max="10" id="quantityNumber" aria-label="desired quantity to add to basket" />
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
  }
  
  start();