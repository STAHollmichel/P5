async function orderRecap() {
    const Order = JSON.parse(localStorage.getItem("order"))


    document.querySelector("#order_recap").insertAdjacentHTML("beforeend",
    `
    <h1 class="text-center py-3">${Order.contact.firstName.toUpperCase()}, votre commande est validée!<i class="fas fa-check ps-1 ori-c2"></i></h1>
    <div class="container d-flex flex-column align-items-center">
        <div class="col-md-12">
            <p>Nous vous remercions d'avoir choisi Orinoco pour vos achats.</p>
            <p>Votre commande d'un montant total de <strong>${Order.contact.total}</strong></p> 
            <p>Numéro de commande:</p>
            <button class="btn fw-b ori-bg1 text-white mb-3" id="order_id">${Order.orderId}</button>
            <p>Elle vous sera envoyée dans les plus brefs délais à l'adresse que vous nous avez fournie lors de la validation à savoir :</p>
            <p class="fw-sb">${Order.contact.address} ${Order.contact.postal} ${Order.contact.city}</p>
            <p>Les informations de suivi vous serons envoyées par mail à l'adresse :</p>
            <p class="fw-sb">${Order.contact.email}<p>
            <br>
            <p>A bientôt chez Orinoco!</p>
        </div>
    </div>`);

    //suppression de la commande dès que l'on sort de la page
    const Links = document.getElementsByTagName("a");
    for (let link of Links){
        link.addEventListener("click", () => localStorage.removeItem("order"));
    }
}

orderRecap();