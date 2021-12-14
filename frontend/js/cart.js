// Affichage du panier

function displayLocalStorage() {
    
    const cartOrder = JSON.parse(localStorage.getItem("cart"))
    
    //Tableu des items pour mapper leur prix et formule de rajout des items pour créer le total

    let priceList = []
    let total = 0

    //On insiste que cartOrder est = 0 et on map les prix des caméras

    if (cartOrder != null) {
        priceList = cartOrder.map((item)=>item.price)

        // On donne la fonction où a = total; b = item

        total = priceList.reduce((a, b) => a + b)
        
    }

    //Si le panier est vide afficher message

    if(!cartOrder){
        document.querySelector("#cart_status").innerText = "Votre panier est vide !";
    }

    //En cas contraire afficher le contenu avec une ou plusieurs caméras

    else{
        for(let item of cartOrder){
            document.querySelector("#cart_status").innerText = "Votre panier contient :"

            document.querySelector("#cart").insertAdjacentHTML("beforeEnd",`
                <div id="cart_card_container" class="col-lg-6 align-self-lg-center">
                    <div class="card ori-bg0 mb-3" id="cart-items">
                        <div class="d-flex justify-content-between">
                            <picture id="cart-item-image">
                                <img src="${item.imageUrl}" class="img-thumbnail rounded ori-bg0" id="cart-img" alt="cart-item-image">
                            </picture>
                            <div class="align-self-center" id="cart-item-title">
                                <p class="fw-b">${item.name}</p>
                            </div>
                            <div class="align-self-center pe-2" id ="cart-item-price">
                                <p class="fw-r">${item.price/100},00 €</p>
                            </div>
                        </div>
                    </div>
                </div>`
            );   
        }

        //Affichage du total

        document.querySelector("#cart_total").insertAdjacentHTML("beforeEnd", `
            <div class="d-flex">
                <p class="fw-b">Total:</p>
                <p class="fw-sb ps-1" id="total-cart-price">${total/100},00€</p>
            </div>`
        );
    }
}

displayLocalStorage();

//Action pour vider le panier 

async function clearCart() {

    //Affichage du button 

    document.querySelector("#cart_clear").insertAdjacentHTML("beforeEnd", `
        <button class="btn btn-full-tertiary" id="clearCart-btn" type="button">Vider le panier</button>`);

    //On vide le local storage et on recharge la page Web

    const BtnClearCart = document.querySelector("#clearCart-btn");
        BtnClearCart.addEventListener("click", () => {
        localStorage.clear();
        window.alert("Panier vide !");
        window.location.reload();
    })         
}

clearCart();