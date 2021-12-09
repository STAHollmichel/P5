displayLocalStorage();
  
function displayLocalStorage() {
    
    const cartOrder = JSON.parse(localStorage.getItem("cart"))

    let priceList = []
    let total = 0

    if (cartOrder != null) {
        priceList = cartOrder.map((item)=>item.price)
        total = priceList.reduce((a, b) => a + b)
    }

    if(!cartOrder){
        document.querySelector("#cart_status").innerText = "Votre panier est vide !";
    }
    else{
        for(let item of cartOrder){
            document.querySelector("#cart_status").innerText = "Votre panier contient :"
            document.querySelector("#cart").insertAdjacentHTML("beforeEnd", 
                `
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
                    `);   
        }
        document.querySelector("#cart_total").insertAdjacentHTML("beforeEnd", `
                        <span class="bg info" id="total-cart-price"><p class="fw-b">Total: ${total/100},00€<p></span>`);
    }
}

clearCart();

async function clearCart() {
    document.querySelector("#cart_clear").insertAdjacentHTML("beforeEnd", `
        <button class="btn btn-full-tertiary" id="clearCart-btn" type="button">Vider le panier</button>`);
    const BtnClearCart = document.querySelector("#clearCart-btn");
        BtnClearCart.addEventListener("click", () => {
        localStorage.clear(); //How to refresh action on Page?
        window.alert("Panier vide !");
        window.location.reload();
    })         
}
