displayLocalStorage();
  
function displayLocalStorage() {
    const cartOrder = JSON.parse(localStorage.getItem("basket"))
    if(!cartOrder){
        document.querySelector("#cart_status").innerText = "Votre panier est vide !";
    }
    else{
        for(let item of cartOrder){
            document.querySelector("#cart_status").innerText = "Votre panier contient :"
            document.querySelector("#cart").insertAdjacentHTML("beforeEnd", `
                <div class="container-sm">
                    <div class="cart-row">
                        <span class="bg info col-sm-3" id="cart-item">ITEM</span>
                        <span class="bg info col-sm-3" id=" price">PRIX</span>
                        <span class="bg info col-sm-3" id="cart-quantity">QUANTITÉ</span>
                    </div>
                    <div class="container-sm" id="cart-items">
                        <div class="container-sm" id="cart-item-row">
                            <div class="container-sm" id="cart-item cart-column">
                                <img src="${item.imageUrl}" id="cart-img" alt="cart-item-image" width="100" height="100">
                                <span class="bg info" id="cart-item-title">${item.name}</span><button class="btn btn-warning btn-remove" type="button">ENLEVER</button>
                            </div>
                    </div>
                    <div class="bg info" id="cart-total">
                    <strong class="bg info" id ="cart-total-title">Total</strong>
                    <span class="info" id ="cart-total-price">,00 €</span>
                    </div>

                    <button class="btn btn-primary btn-purchase" type="button">Commander</button>
                </div>
                `
            ); 
        }
    }
}

