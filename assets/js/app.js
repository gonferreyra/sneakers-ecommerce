import * as v from "./variables.js"
import { hamburguerMenu } from "./hamburguer-menu.js"
import { sneakers } from "./db.js"
import { loadSelectedShoes } from "./loadshoes.js"
import { searchSneakers } from "./search.js";
import { addToCart, deleteSneaker, resetCartItems, cleanCartHTML, cartHTML, getLocalStorage, cartQuantityAdd, cartQuantityRemove } from "./cart.js";

LoadEventlisteners()
function LoadEventlisteners() {
    document.addEventListener('DOMContentLoaded', () => {
        hamburguerMenu();
        loadSelectedShoes(sneakers, "Tenis")
        // Localstorage
        getLocalStorage();
        cartHTML();
    });

    // Show selected category
    v.jordanBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Jordan");
    });

    v.tenisBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Tenis");
    });

    v.footballBtn.addEventListener('click', e => {
        e.preventDefault();
        loadSelectedShoes(sneakers, "Football");
    });

    // Add shoes to cart
    v.shoesList.addEventListener('click', addToCart);

    // Delete from cart
    v.cart.addEventListener("click", deleteSneaker);

    // Search
    v.inputSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchSneakers();
    });

    // Empty cart
    v.emptyCart.addEventListener("click", () => {
        resetCartItems()
        cleanCartHTML();
        cartHTML();
    });

    // Buy
    v.buyBtn.addEventListener('click', () => {
        window.location.href = 'login.html'
    })

    // Add quantity to cart
    v.cartTable.addEventListener('click', cartQuantityAdd);

    // Remove quantity to cart
    v.cartTable.addEventListener('click', cartQuantityRemove);
};
