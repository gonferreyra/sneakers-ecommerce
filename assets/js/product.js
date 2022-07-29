import * as variables from "./variables.js";
import { hamburguerMenu } from "./hamburguer-menu.js";
import { sneakers } from "./db.js";


loadEventListeners();
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        hamburguerMenu();
        getInfo();
    })
}

const LoadProductCard = (id) => {
    sneakers.map(sneaker => {
        // const { name, category, price, stock, url, info, id } = sneakers;
        if (id === sneaker.id) {
            console.log(sneaker)
            const { name, category, price, stock, url, info, id } = sneaker;
            const div = document.createElement('div');
            div.classList.add('products__container');
            div.innerHTML = `
            <div class="product__img">
                <img src="${url}" alt="">
            </div>
            <div class="product__info__container">
            <div class="product__name__title">
              <h2>${name}</h2>
            </div>
            <div class="product__category">
              <p>Category: <span>${category}</span></p>
              <p>Availability: <span>${stock}</span></p>
            </div>
            <div class="product__price">
              <p>$ ${price}</p>
            </div>
            <div class="product__info">
              <p>${info}</p>
            </div>
            <div class="product__btn">
              <button class="learn-more product-btn">
                <a href="#" class="add-to-cart" data-id="${id}">
                  <span class="circle add-to-cart" aria-hidden="true">
                    <span class="icon arrow add-to-cart"></span>
                  </span>
                  <span class="button-text add-to-cart">Add to Cart</span>
                </a>
              </button>
            </div>
            `
            variables.products.appendChild(div);
        }
    })


}

const getInfo = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    console.log(id);
    LoadProductCard(id)
}

