async function getApi() {
  try {
    const url = `https://ecommercebackend.fundamentos-29.repl.co/`;
    const data = await fetch(url);
    const res = await data.json();
    window.localStorage.setItem("products", JSON.stringify(res));
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}
function printProductHomePage(db) {
  const products = document.querySelector(".allProducts");
  let html = "";
  for (const product of db.products) {
    // console.log(db?.products);
    html += `    
      <div class="product" id=${product.id}>
        <div class="product__price">
          <b>$ ${product.price}</b>
        </div>
        <div class="product_img">
            <img class="modal__img" id=${product.id} src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="product_description">
          <p class="product_name">${product.name}</p>
        </div>            
        <div class="product_stock">
          <p class="product_stock"><b>Stock:</b> ${product.quantity}</p> 
        </div>            
        <div class="position__buttom">
          <button id="${product.id}" class="button__add add__card">Añadir al carrito</button>
        </div>        
      </div>                    
    `;
  }
  products.innerHTML = html;
}
function addToCarShopping(db) {
  const productsHtml = document.querySelector(".allProducts");
  productsHtml.addEventListener("click", function (e) {
    if (e.target.classList.contains("button__add")) {
      const id = Number(e.target.id);
      const productFind = db.products.find(function (product) {
        return product.id === id;
      });
      if (productFind?.quantity === 0) {
        return alert("Este producto no tiene stock");
      }
      if (db.cart[productFind.id]) {
        if (db.cart[productFind.id]) {
          if (productFind.quantity === db.cart[productFind.id].amount) {
            return alert("No tenemos mas en bodega");
          }
        }
        db.cart[productFind.id].amount++;
      } else {
        productFind.amount = 1;
        db.cart[productFind.id] = productFind;
      }
      console.log(db.cart);
      window.localStorage.setItem("cart", JSON.stringify(db.cart));
      printCarShopping(db);
      totalCountShopping(db);
    }
  });
}
function printCarShopping(db) {
  const cart__products = document.querySelector(".header__contentShopping");
  let html = "";
  for (const product in db.cart) {
    const { quantity, price, name, image, id, amount } = db.cart[product];
    html += `
      <div class="card__product">        
        <div class="card__imageDescription">
            <div class="card__productImage">
                <img src="${image}" alt="">
            </div>
            <div class="card__productDescription">
                <p>${name}</p> </br>
                <p><b>Costo: </b>${price}</p>
                <p><b>Stock: </b>${quantity}</p>
            </div>
        </div>
        <div id=${id} class="card__productButton">
          <b class="icon__minus">-</b>
          <b class="quantity" >${amount}</b>
          <b class="icon__plus" data-id="${id}">+</b>
          <button class="delete__product" data-id="${id}">
              Eliminar
          </button>          
        </div>        
      </div>      
    `;
  }
  cart__products.innerHTML = html;
}
function handleCardShopping(db) {
  const cart__products = document.querySelector(".header__contentShopping");

  cart__products.addEventListener("click", (e) => {
    if (e.target.classList.contains("icon__plus")) {
      const id = Number(e.target.parentElement.id);
      const productFind = db.products.find(function (product) {
        return product.id === id;
      });
      if (db.cart[productFind.id]) {
        if (productFind.quantity === db.cart[productFind.id].amount) {
          return alert("Se nos ha agotado el stock");
        }
      }
      db.cart[id].amount++;
    }
    if (e.target.classList.contains("icon__minus")) {
      const id = Number(e.target.parentElement.id);
      if (db.cart[id].amount === 1) {
        const response = confirm(
          "¿Quieres borrar este producto?"
        );
        if (!response) {
          return;
        }
        delete db.cart[id];
      } else {
        db.cart[id].amount--;
      }
    }
    if (e.target.classList.contains("delete__product")) {
      const id = Number(e.target.parentElement.id);
      const response = confirm(
        "Estas seguro que quieres borrar este producto?"
      );
      if (!response) {
        return;
      }
      delete db.cart[id];
    }
    window.localStorage.setItem("cart", JSON.stringify(db.cart));
    printCarShopping(db);
    totalCountShopping(db);
  });
}
function totalCountShopping(db) {
  const info_counter = document.querySelector(".navbar__menuRight .counter");
  const info_total = document.querySelector(".info__Total");
  const info_amount = document.querySelector(".info__amount");
  let totalProducts = 0;
  let amountProducts = 0;

  for (const product in db.cart) {
    amountProducts += db.cart[product].amount;
    totalProducts += db.cart[product].amount * db.cart[product].price;
  }
  info_amount.textContent = "Cantidad: " + amountProducts;
  info_total.textContent = "Total: $" + totalProducts;
  info_counter.textContent = amountProducts;
}
function handleFilterProducts(db) {
  const productsFilter = document.querySelectorAll(".content__list");
  productsFilter[0].addEventListener("click", function () {
    printProductHomePage(db);
  });
  productsFilter[1].addEventListener('click', function () {
    const productsHTML = document.querySelector(".allProducts");
    let html = "";
    for (const product of db.products) {
      if (product.category === "shirt") {
        html += `
        <div class="product" id=${product.id}>
          <div class="product__price">
            <b>$ ${product.price}</b>
          </div>
          <div class="product_img">
              <img class="modal__img" id=${product.id} src="${product.image}" alt="${product.name}"/>
          </div>
          <div class="product_description">
            <p class="product_name">${product.name}</p>
          </div>            
          <div class="product_stock">
            <p class="product_stock"><b>Stock:</b> ${product.quantity}</p> 
          </div>            
          <div class="position__buttom">
            <button id="${product.id}" class="button__add add__card">Añadir al carrito</button>
          </div>        
        </div>                    
        `;
      }
    }
    productsHTML.innerHTML = html;
  });
  productsFilter[2].addEventListener("click", function () {
    const productsHTML = document.querySelector(".allProducts");
    let html = "";
    for (const product of db.products) {
      if (product.category === "hoddie") {
        html += `
        <div class="product" id=${product.id}>
          <div class="product__price">
            <b>$ ${product.price}</b>
          </div>
          <div class="product_img">
              <img class="modal__img" id=${product.id} src="${product.image}" alt="${product.name}"/>
          </div>
          <div class="product_description">
            <p class="product_name">${product.name}</p>
          </div>            
          <div class="product_stock">
            <p class="product_stock"><b>Stock:</b> ${product.quantity}</p> 
          </div>            
          <div class="position__buttom">
            <button id="${product.id}" class="button__add add__card">Añadir al carrito</button>
          </div>        
        </div>                    
        `;
      }
    }
    productsHTML.innerHTML = html;
  });
  productsFilter[3].addEventListener("click", function () {
    const productsHTML = document.querySelector(".allProducts");
    let html = "";
    for (const product of db.products) {
      if (product.category === "sweater") {
        html += `
        <div class="product" id=${product.id}>
          <div class="product__price">
            <b>$ ${product.price}</b>
          </div>
          <div class="product_img">
              <img class="modal__img" id=${product.id} src="${product.image}" alt="${product.name}"/>
          </div>
          <div class="product_description">
            <p class="product_name">${product.name}</p>
          </div>            
          <div class="product_stock">
            <p class="product_stock"><b>Stock:</b> ${product.quantity}</p> 
          </div>            
          <div class="position__buttom">
            <button id="${product.id}" class="button__add add__card">Añadir al carrito</button>
          </div>        
        </div>                    
        `;
      }
    }
    productsHTML.innerHTML = html;
  });
}
function buyProductsCard(db) {
  const btnBuy = document.querySelector(".btn__buy");
  btnBuy.addEventListener("click", () => {
    if (!Object.keys(db.cart).length) {
      return alert("No tienes productos para comprar");
    }
    const response = confirm("seguro que quieres Comprar?");
    if (!response) {
      return;
    }
    for (const product of db.products) {
      const cartProduct = db.cart[product.id];
      if (product.id === cartProduct?.id) {
        product.quantity -= cartProduct.amount;
      }
    }
    db.cart = {};
    window.localStorage.setItem("products", JSON.stringify(db.products));
    window.localStorage.setItem("cart", JSON.stringify(db.cart));
    printProductHomePage(db);
    printCarShopping(db);
    totalCountShopping(db);
  });
}
function modalProducts(db) {
  const productsModalHTML = document.querySelector(".allProducts");
  const product__modal = document.querySelector(".header__content");
  productsModalHTML.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal__img")) {
      const id = Number(e.target.id);
      const productFind = db.products.find(function (product) {
        return product.id === id;
      });
      product__modal.innerHTML = `
      <div class="modal__product">  
        <div class="modal__btnX">
          <label for="checkModal" class="modal__close"><i class="fa-solid fa-circle-xmark"></i><span/>
        </div>     
        <div class="modal__image__description">
          <div class="modal__product_img">
              <img  src="${productFind.image}" alt="${productFind.name}"/>
          </div>
          <div class="modal__product_info">
            <div class="modal__product_name">
              <b class="modal__product_name">${productFind.name}</b> </br>  </br> 
            </div>            
            <div class="modal__product_description">
              <p class="modal__product_name">${productFind.description}</p> </br> 
            </div>            
            <div class="modal__product_quantityCategory">
              <p class="modal__product_quantity"><b>Stock:</b> ${productFind.quantity}</p> </br>               
              <p class="modal__product_category"><b>Category:</b> ${productFind.category}</p> </br>              
            </div>
            <div class="modal__product_price">
              <div class="modal__product_price"><b>Precio:</b>$ ${productFind.price}</div> </br> 
            </div>           
                                           
      </div>            
      `;
    }
  });
}
function eventResetPage(db){
  const pageResetLogo = document.querySelectorAll(".navbar__imgLogo");
  pageResetLogo[0].addEventListener("click", function () {
    printProductHomePage(db);
  });
  const pageResetHome = document.querySelectorAll(".btn__home");
  pageResetHome[0].addEventListener("click", function () {
    printProductHomePage(db);
  });
}
// funcion global
async function main() {
  const db = {
    products:
      JSON.parse(window.localStorage.getItem("products")) || (await getApi()),
    cart: JSON.parse(window.localStorage.getItem("cart")) || {},
  };
  //Consumo de la API
  getApi();
  //Pintando los productos en la pagina
  printProductHomePage(db);
  //Colocamos los productos en el carrito
  addToCarShopping(db);
  //imprimir el producto en el carrito
  printCarShopping(db);
  //Funciones a botones del carrito
  handleCardShopping(db);
  //Calculos de las ventas
  totalCountShopping(db);
  //filtro de productos por categorias
  handleFilterProducts(db);
  //Boton Comprar
  buyProductsCard(db);
  //Modal de los productos
  modalProducts(db);
  // reiniciar pagina
  eventResetPage(db);
}
main();