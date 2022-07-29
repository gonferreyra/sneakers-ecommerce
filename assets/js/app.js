import * as variable from "./variables.js"
import { hamburguerMenu } from "./hamburguer-menu.js"
import { sneakers } from "./db.js"
import { loadSelectedShoes } from "./loadshoes.js"
import { searchSneakers } from "./search.js";
// import { deleteSneaker } from "./cart.delete.js";



export let cartItems = []; // Variable donde se almacenan los articulos del carrito

// export const cartContainer = document.querySelector("#cart-list tbody");
// const shoesList = document.querySelector('#shoes-list');
// const cart = document.querySelector("#cart");
// const emptyCart = document.querySelector("#empty-cart");
// const inputSearchBtn = document.querySelector(".search button");
// export const shoesContainer = document.querySelector(".shoes__container");
// export const selectJordan = document.querySelector(".select_jordan");
// export const selectTenis = document.querySelector(".select_tenis");
// export const selectFootball = document.querySelector(".select_football");

// const jordanBtn = document.querySelector(".select__jordan");
// const tenisBtn = document.querySelector(".select__tenis");
// const footballBtn = document.querySelector(".select__football");
// export const errorContainer = document.querySelector(".error_container");

// export const cartTablaTotal = document.querySelector(".cart__tabla__total");
// export const cartTablaTotalSpan = document.querySelector(".cart__tabla__total span");


// console.log(shoesList)



LoadEventlisteners()

function LoadEventlisteners() {


    document.addEventListener('DOMContentLoaded', () => {
        hamburguerMenu();
        // loadShoes(sneakers);
        loadSelectedShoes(sneakers, "Tenis")
        // cart total

    });

    // Show selected category
    variable.jordanBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Jordan");
    });

    variable.tenisBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Tenis");
    });

    variable.footballBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Football");
    });

    // Add shoes to cart
    variable.shoesList.addEventListener('click', addToCart);

    // Delete from cart
    variable.cart.addEventListener("click", deleteSneaker);

    // Cart Total


    // Search
    variable.inputSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchSneakers();
    });


    variable.emptyCart.addEventListener("click", () => {
        cartItems = [];
        cleanCartHTML();
        cartHTML();

    })

}

function addToCart(e) {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement)
        const selectedSneaker = e.target.parentElement.parentElement.parentElement.parentElement;
        readData(selectedSneaker);
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function readData(sneaker) {
    // console.log(sneaker)    
    const sneakerInfo = {
        img: sneaker.querySelector(".card__img img").src,
        name: sneaker.querySelector(".card__name p").textContent, //Extrameos el texto
        price: sneaker.querySelector(".card__price p").textContent,
        id: sneaker.querySelector(".card__btn a").getAttribute("data-id"),
        cantidad: 1
    }
    // console.log(sneakerInfo)

    // Revisar si existe el elemento en el carrito
    const exists = cartItems.some(sneaker => sneaker.id === sneakerInfo.id);
    // console.log(exists)
    if (exists) {
        // Actualizamos la cantidad
        const sneakers = cartItems.map(sneaker => {
            if (sneaker.id === sneakerInfo.id) {
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

function deleteSneaker(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete-sneaker")) {
        const sneakerId = e.target.getAttribute("data-id");
        // console.log(sneakerId)

        // Eliminar por data-id
        cartItems = cartItems.filter(sneaker => sneaker.id !== sneakerId);


        cartHTML();

    }
}

// Mostrar el carrito en el HTML
export function cartHTML() {

    // Precio total del carrito
    // let totalTest = 0;
    // VER COMO REINICIO CUANDO APRIENTO EL BOTON DE ELIMINAR TODO
    let cartListTotal = 0;

    if (cartListTotal === 0) {
        variable.cartTablaTotalSpan.textContent = "No hay elementos en el carrito";
    }


    //Limpiar carrito HTML
    cleanCartHTML();

    // Recorrer el carrito
    cartItems.forEach(sneaker => {
        // Falta cantidad, VER COMO LO HAGO
        const { img, name, price, cantidad, id } = sneaker;
        cartListTotal += parseInt(price.slice(2)) * cantidad;
        // totalTest += cantidad;
        console.log(cartListTotal)
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${img}">
        </td>
        <td>${name}</td>
        <td>${price}</td>
        <td>
        <button>-</button>
        ${cantidad}
        <button>+</button>
        </td>
        <td>
            <a href="#" class="delete-sneaker" data-id="${id}"> X </a>  
        </td>
        `
        variable.cartContainer.appendChild(row);
        // Quitar el parrafo y agregar total
        if (cartListTotal > 0) {
            variable.cartTablaTotalSpan.textContent = `Total $ ${cartListTotal}`;
        }
    })
}

// Agregar total tabla



// Limpia el carrito
export function cleanCartHTML() {
    while (variable.cartContainer.firstChild) {
        variable.cartContainer.removeChild(variable.cartContainer.firstChild)
        // cartHTML()
    }
}

// Limpia HTML
export function cleanHTML() {
    while (variable.shoesContainer.firstChild) {
        variable.shoesContainer.removeChild(variable.shoesContainer.firstChild)
    }
}





