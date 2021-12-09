fillingForm();


function fillingForm() {
    
    document.querySelector("#filling__form").insertAdjacentHTML("beforeEnd", 
    `
    <form class="col-lg-6 align-self-lg-center mt-4">
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
          <button type="submit" value="submit" class="btn btn-full-secondary" id="btn-form-valid" >Valider la commande</button>
      </div>
    </form>
    `);
}
  

// function validateForm() {
//   let x = document.forms["maCommande"]["nom"]["prénom"]["adresse"]["cPostal"]["ville"]["pays"]["email"].value;
//   if (x == "") {
//     alert("Veuillez remplir le formulaire");
//     return false;
//   }
// }

// /* <form name="myForm" action="/order.html" onsubmit="return validateForm()" method="post">
//   Name: <input type="text" name="fname">
//   <input type="submit" value="Submit">
// </form> */




function formManagement() {
    const products = []
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
    const FormOrder = document.querySelector("#filling__form");                  
    FormOrder.addEventListener("submit", function(e){
      e.preventDefault();

      let inputValid = true;

      for (let input of document.querySelectorAll("#form-order input")){  
        inputValid = inputValid && input.reportValidity;
        if(input.reportValidity()){
          ifSuccess(input);
          inputValid = true;
        }else{
          ifDanger(input);
          inputValid = false;
        };
      }; 

      if(inputValid){
        let contact = getUserInfo();
        let dataOrder = {contact, products};
        
        //sendl'objet dataOrder to api
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
          localStorage.setItem("order", JSON.stringify(order));
          localStorage.removeItem("basketItems")
          window.location.assign("order.html");
        })
      }
      e.stopPropagation();
    });
}

formManagement();
  ///Object for POST's table///
  
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
  
  //recover user info for POST
  function getUserInfo(){
    let lastName = document.querySelector("#userName").value;
    let firstName =  document.querySelector("#userFirstName").value;
    let address =  document.querySelector("#userAddress").value;
    let city =  document.querySelector("#city").value;
    let email =  document.querySelector("#userEmail").value;
    let postal = document.querySelector("#postalCode").value;
    let totalCount = document.querySelector("#total-cart-price").innerHTML;
    
    const user = new contact(lastName, firstName, address, city, email, postal, totalCount);
    return user
  };