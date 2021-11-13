fillingForm();


function fillingForm() {
    
    document.querySelector("#filling__form").insertAdjacentHTML("beforeEnd", `<form class="mt-4">
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="userName" >Nom</label>
            <input type="text" class="form-control" id="userName" placeholder="Nom" pattern="^[A-Za-z- 'éè^]+$" required />
        </div>
        <div class="form-group col-md-6">
            <label for="userFirstName">Prénom</label>
            <input type="text" class="form-control" id="userFirstName" placeholder="Prénom" pattern="^[A-Za-z- éè^]+$" required />
        </div>
    </div>
    <div class="form-group">
        <label for="userAddress">Adresse</label>
        <input type="text" class="form-control" id="userAddress" placeholder="Entrez votre adresse complète" pattern="^[A-Za-z- 0-9'ëêéàè]+$" required />
    </div>
    <div class="form-row">
        <div class="form-group col-md-2">
            <label for="postalCode" >Code Postal</label>
            <input type="text" class="form-control" id="postalCode" minlength="4" maxlength="6" pattern="^[0-9]+$" placeholder="ex : 76100" required/>
        </div>
        <div class="form-group col-md-6">
            <label for="city">Ville</label>
            <input type="text" class="form-control" id="city" pattern="^[A-Za-z- éèà]+$" required>
        </div>
        <div class="form-group col-md-4">
            <label for="country">Pays</label>
            <input type="text" id="country" class="form-control" minlength="2" pattern="^[A-Za-z- ëê]+$" required/>
        </div>
    </div>
    <div class="form-group">
        <label for="userEmail">Email</label>
        <input type="email" class="form-control" id="userEmail" placeholder="Entrez votre adresse email @" pattern="^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$" required />
    </div>
    <button type="submit" class="btn btn-dark mb-4 mt-3 col-md-6 col-lg-5 " id="btn-form-valid" >Valider la commande</button>
</form>`);
}

console.log(fillingForm)