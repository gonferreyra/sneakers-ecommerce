import * as variable from "./variables.js"
import { sneakers } from "./db.js"
import { cleanCartHTML, cleanHTML } from "./app.js";

const shoesContainer = document.querySelector('.shoes__container');
const shoesContainerAll = document.querySelector('.shoes__container__all');


// Muestra todas las zapatillas
// export const loadShoes = (sneakers) => {
//   // cleanCartHTML();

//   sneakers.map(sneaker => {
//     const { id, name, category, price, stock, url } = sneaker;
//     // console.log(sneaker)
//     const div = document.createElement('div');
//     div.classList.add('shoes-card');
//     div.innerHTML = `
//           <div class="card__img">
//             <a href="#"><img src="${url}" alt=""></a>
//           </div>
//           <div class="card__name">
//             <p>${name}</p>
//           </div>
//           <div class="card__category">
//             <p>${category}</p>
//           </div>
//           <div class="card__price">
//             <p>$ ${price}</p>
//           </div>
//           <div class="card__btn">
//             <a href="#" class="add-to-cart" data-id="${id}">Add to cart</a>
//           </div>
//         `
//     shoesContainer.appendChild(div)
//     // shoesContainerAll.appendChild(div);
//   });
// }

// Muesta solo la categoria elegida
export const loadSelectedShoes = (sneakers, brand) => {
  cleanHTML();


  // Quitar el parrafo y agregar total

  // console.log(cartTablaTotalSpan)
  // console.log(cartContainer.hasChildNodes())



  sneakers.map(sneaker => {
    const { id, name, category, price, stock, url } = sneaker;
    // console.log(sneaker)
    if (category === brand) {
      const div = document.createElement('div');
      div.classList.add('shoes-card');
      div.innerHTML = `
              <div class="shoes__card__container">
                <div class="card__img">
                  <a href="product.html?id=${id}"><img src="${url}" alt=""></a>
                </div>
                <div class="card__name">
                  <p>${name}</p>
                </div>
                <div class="card__category">
                  <p>${category}</p>
                </div>
                <div class="card__price">
                  <p>$ ${price}</p>
                </div>
                <div class="card__btn">
                  <button class="learn-more">
                    <a href="#" class="add-to-cart" data-id="${id}">
                      <span class="circle add-to-cart" aria-hidden="true">
                      <span class="icon arrow add-to-cart"></span>
                      </span>
                      <span class="button-text add-to-cart">Add to Cart</span>
                    </a>
                  </button>
                </div>
              </div>
            `
      variable.shoesContainer.appendChild(div)

      if (!variable.cartContainer.hasChildNodes()) {
        variable.cartTablaTotalSpan.textContent = "No hay elementos en el carrito";
      }
    }
  });
}