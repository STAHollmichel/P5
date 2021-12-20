//  Affichage du formulaire de commande et son bouton pour la valider

function displayForm() {

  document.querySelector("#filling_form").insertAdjacentHTML("beforeEnd", `
    <div class="accordion" id="form">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button ori-bg0" type="button" data-bs-toggle="collapse" data-bs-target="#formcollapse" aria-expanded="true" aria-controls="collapseOne">
          <h2 class="pe-3">Formulaire</h2>
        </button>
      </h2>
      <div id="formcollapse" class="accordion-collapse collapse" data-bs-parent="#form">
        <div class="container d-flex flex-column">
          <form class="col-md-10 align-self-center mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userName" >Nom</label>
                    <input type="text" name="nom" class="form-control" id="userName" placeholder="Nom" pattern="^[A-Za-z- 'éè^]+$" required/>
                </div>
                <div class="form-group col-md-6">
                    <label for="userFirstName">Prénom</label>
                    <input type="text" name="prénom" class="form-control" id="userFirstName" placeholder="Prénom" pattern="^[A-Za-z- éè^]+$" required/>
                </div>
            </div>
            <div class="form-group">
                <label for="userAddress">Adresse</label>
                <input type="text" name="adresse" class="form-control" id="userAddress" placeholder="Entrez votre adresse complète" pattern="^[A-Za-z- 0-9'ëêéàè]+$" required/>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="postalCode" >Code Postal</label>
                    <input type="text" name="cPostal" class="form-control" id="postalCode" minlength="4" maxlength="6" pattern="^[0-9]+$" placeholder="ex : 76100" required/>
                </div>
                <div class="form-group col-md-6">
                    <label for="city">Ville</label>
                    <input type="text" name="ville" class="form-control" id="city" pattern="^[A-Za-z- éèà]+$" required/>
                </div>
                <div class="form-group col-md-4">
                    <label for="country">Pays</label>
                    <input type="text" name"pays" id="country" class="form-control" minlength="2" pattern="^[A-Za-z- ëê]+$" required/>
                </div>
            </div>
            <div class="form-group">
                <label for="userEmail">Email</label>
                <input type="email" namel"email" class="form-control" id="userEmail" placeholder="Entrez votre adresse email @" pattern="^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,8}$" required/>
            </div>
            <div class="text-center m-3">
                <button type="submit" value="submit" class="btn btn-full-secondary" id="btn-form-valid">Valider la commande</button>
            </div>
          </form>
        </div>
      </div>
    </div>`
  );
}

displayForm();

function formManagement() {

  // Creation de un tableau qui va contenir la liste des produits qui sont dans le panier
  
  let products = []
  cartOrder = JSON.parse(localStorage.getItem("cart"))
  products = cartOrder.map((item)=>item._id) //on map le id de chaque produit pas que on veut que ça
  

  let formInputs = document.querySelectorAll("#form-order input");

  for (let input of formInputs){

    input.addEventListener("change", function(){
      
      if(input.reportValidity()){
        ifSuccess(input);

      }else{
        ifDanger(input);
      };
    });
  };

  //Actions de vérification du formulaire au moment de l'envoi

  const FormOrder = document.querySelector("#filling_form");                  
  FormOrder.addEventListener("submit", function(e){

    e.preventDefault(); //si inputValid est = false on anule la action "submit"

    //Variable pour confirmer si la saisie est correcte

    let inputValid = true;

    //Parcours de chacun des inputs pour vérification

    for (let input of document.querySelectorAll("#form-order input")){ 
      
      // Vérification que les champs d'inputs saisis soient corrects

      inputValid = inputValid && input.reportValidity;
      if(input.reportValidity()){
        ifSuccess(input);
        inputValid = true;
      }else{
        ifDanger(input);
        inputValid = false;
      };
    }; 

    // Si toutes les inputs sont Ok

    if(inputValid){

      //On recupere les infos et on crée un objet à envoyer en POST

      let contact = getUserInfo();
      let dataOrder = {contact, products};
      
      //Envoi d'objet dataOrder à l'api

      fetch('http://localhost:3000/api/cameras/order', {
        method: "POST",
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dataOrder)
      })

      .then(function(response){
        
        if(response.ok){
          return response.json()
        }
      })
      
      .then(order => {
        // alert(JSON.stringify(order));
        localStorage.setItem("order", JSON.stringify(order));// On defini l'object comme une commande dans le localStorage
        localStorage.removeItem("cart") // On supprime le panier
        window.location.assign("order.html"); // On dirige vers la page de commande
      })
    }
    e.stopPropagation(); //Evite l'action de prendre d'autres objects qui sont pas dans l'action courrente
  });
}

formManagement();

//Object pour le tableau du POST//
  
  //Objet contact

class contact {
  constructor (lastName, firstName, address, city, email, postal, cartTotal){
    this.lastName = lastName,
    this.firstName = firstName,
    this.address = address,
    this.city = city,
    this.email = email
    this.postal = postal,
    this.total = cartTotal
  }
};
  
//Récupération de l'information d'utilisateur pour le POST

function getUserInfo() {

  let lastName = document.querySelector("#userName").value;
  let firstName =  document.querySelector("#userFirstName").value;
  let address =  document.querySelector("#userAddress").value;
  let city =  document.querySelector("#city").value;
  let email =  document.querySelector("#userEmail").value;
  let postal = document.querySelector("#postalCode").value;
  let totalCount = document.querySelector("#total-cart-price").innerHTML;
  
  //Mapping de contact avec la class contact
  
  const user = new contact(lastName, firstName, address, city, email, postal, totalCount);
  return user;
};