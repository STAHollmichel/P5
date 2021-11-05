
function displayCamera(camera) {
       document.querySelector("#main-product-page").insertAdjacentHTML("beforeend", `
     <div class="camera-card" data-id="${camera._id}">
     <img src="${camera.imageUrl}" class="card-img-top" width="200px" alt="">
       <div class="camera-detail">
           <h5 class="card-title">${camera.name}</h5>
           <p  class="card-price">Prix : ${camera.price /100},00 €</p>
           <a class="btn btn-info choice" href="./product_page.html?id=${camera._id}" type="button">Visualiser le produit</a>
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