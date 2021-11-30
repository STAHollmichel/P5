displayLocalStorage();
  
function displayLocalStorage() {
    const cartOrder = JSON.parse(localStorage.getItem("cart"))
    const priceList = cartOrder.map((item)=>item.price)
    const total = priceList.reduce((a, b) => a + b)
    if(!cartOrder){
        document.querySelector("#cart_status").innerText = "Votre panier est vide !";
    }
    else{
        for(let item of cartOrder){
            document.querySelector("#cart_status").innerText = "Votre panier contient :"
            document.querySelector("#cart").insertAdjacentHTML("beforeEnd", `
                <div class="container-sm">
                    <div class="container-sm" id="cart-items">
                        <div class="container-sm" id="cart-item-row">
                            <div class="container-sm" id="cart-item cart-column">
                                <img src="${item.imageUrl}" id="cart-img" alt="cart-item-image" width="100" height="100">
                                <span class="bg info" id="cart-item-title"><strong>${item.name}</strong></span>
                                <strong class="bg info" id ="cart-total-title">Prix</strong>
                                <span class="bg info" id ="cart-item-price">${item.price/100},00 €</span>
                            </div>
                        </div>
                    </div>
                `);   
        }
        document.querySelector("#cart_total").insertAdjacentHTML("beforeEnd", `
                        <span class="bg info" id="total-cart-price"><p><strong>Total: ${total/100},00€</strong><p></span>`);
    }
}

clearCart();

async function clearCart() {
    document.querySelector("#cart_clear").insertAdjacentHTML("beforeEnd", `
        <button class="btn btn-warning" id="clearCart-btn" type="button">Vider le panier</button>`);
    const BtnClearCart = document.querySelector("#clearCart-btn");
        BtnClearCart.addEventListener("click", () => {
        localStorage.clear(); //How to refresh action on Page?
        window.alert("Panier vide !");
        window.location.reload();
    })         
}
