import * as v from './variables.js';

// Variable donde se almacenan los articulos del carrito
export let cartItems = [];

// funcion que resetee el carrito (no esta permitido reasignar valores a variables importadas)
export function resetCartItems() {
    cartItems = [];
}

export function updateCartItems(param) {
    cartItems = [...param];
}

export function addCartItemsExport(param1, param2) {
    cartItems = [...param1, param2];
}

export function getLocalStorage() {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(e) {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement)
        const selectedSneaker = e.target.parentElement.parentElement.parentElement.parentElement;
        readData(selectedSneaker);
    }
}

export function readData(sneaker) {
    const sneakerInfo = {
        img: sneaker.querySelector(".card__img img").src,
        name: sneaker.querySelector(".card__name p").textContent, //Extrameos el texto
        // stock: sneaker.querySelector(".card__stock p").textContent,
        price: sneaker.querySelector(".card__price p").textContent,
        id: sneaker.querySelector(".card__btn a").getAttribute("data-id"),
        cantidad: 1
    }

    // Revisar si existe el elemento en el carrito
    const exists = cartItems.some(sneaker => sneaker.id === sneakerInfo.id);
    if (exists) {
        // Actualizamos la cantidad
        const sneakers = cartItems.map(sneaker => {
            if (sneaker.id === sneakerInfo.id) {
                // if(sneaker.cantidad >= sneakerInfo.stock) {
                //     // console.log("no hay stock");
                //     // outOfStockError();
                //     return sneaker;
                // } else {
                //     sneaker.cantidad++;
                //     return sneaker;
                // }
                sneaker.cantidad++;
                return sneaker;
            } else {
                return sneaker;
            }
        });
        cartItems = [...sneakers];
    } else {
        // Agregamos el articulo al carrito
        cartItems = [...cartItems, sneakerInfo];
    }
    cartHTML()
}

export function deleteSneaker(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete-sneaker")) {
        const sneakerId = e.target.getAttribute("data-id");
        // Eliminar por data-id
        cartItems = cartItems.filter(sneaker => sneaker.id !== sneakerId);
        cartHTML();
    }
}

export function cartQuantityRemove(e) {
    if (e.target.classList.contains("button__minus")) {
        const sneakerId = e.target.getAttribute("data-id");
        const sneakers = cartItems.map(sneaker => {
            if (sneaker.id == sneakerId && sneaker.cantidad >= 2) {
                sneaker.cantidad--;
                return sneaker;
            } else {
                return sneaker;
            }
        });
        cartItems = [...sneakers];
    }
    cartHTML();
}

export function cartQuantityAdd(e) {
    if (e.target.classList.contains("button__plus")) {
        const sneakerId = e.target.getAttribute("data-id");
        const sneakers = cartItems.map(sneaker => {
            if (sneaker.id == sneakerId && sneaker.cantidad) {
                sneaker.cantidad++;
                return sneaker;
            } else {
                return sneaker;
            }
        });
        cartItems = [...sneakers];
    }
    cartHTML();
}

// Mostrar el carrito en el HTML
export function cartHTML() {

    // Precio total del carrito
    let cartListTotal = 0;

    if (cartListTotal === 0) {
        v.cartTablaTotalSpan.textContent = "No hay elementos en el carrito";
    }

    //Limpiar carrito HTML
    cleanCartHTML();

    // Recorrer el carrito
    cartItems.forEach(sneaker => {
        // Falta cantidad, VER COMO LO HAGO
        const { img, name, price, cantidad, id } = sneaker;
        cartListTotal += parseInt(price.slice(2)) * cantidad;
        // console.log(cartListTotal)
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${img}">
        </td>
        <td>${name}</td>
        <td>${price}</td>
        <td>
        <button class="button__minus" data-id="${id}">-</button>
        ${cantidad}
        <button class="button__plus" data-id="${id}">+</button>
        </td>
        <td>
            <a href="#" class="delete-sneaker" data-id="${id}"> X </a>  
        </td>
        `
        v.cartContainer.appendChild(row);
        // Quitar el parrafo y agregar total
        if (cartListTotal > 0) {
            v.cartTablaTotalSpan.textContent = `Total $ ${cartListTotal}`;
        }
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();
}

// Localstorage
export const sincronizarStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Limpia el carrito
export function cleanCartHTML() {
    while (v.cartContainer.firstChild) {
        v.cartContainer.removeChild(v.cartContainer.firstChild)
    }
}

// Limpia HTML
export function cleanHTML() {
    while (v.shoesContainer.firstChild) {
        v.shoesContainer.removeChild(v.shoesContainer.firstChild)
    }
}

// No hay stock
// function outOfStockError() {
//     setTimeout(() => {
//         v.stockErrorDiv.textContent = "No stock on selected sneaker";
//     }, timeout);
    
// }