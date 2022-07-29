import * as variable from "./variables.js"
import { cleanCartHTML, cleanHTML } from "./app.js";
import { sneakers } from "./db.js";
import { showError } from "./error.js";
import { loadSelectedShoes } from "./loadshoes.js";

// const inputSearchBtn = document.querySelector(".search button");
const inputSearch = document.querySelector(".search input");

export function searchSneakers() {
    cleanHTML();
    let searchResult = [];
    let searchValue = inputSearch.value.toLowerCase();

    if (searchValue === "") {
        showError("Busqueda vacia, debe ingresar un precio, categoria o nombre para buscar");
        return;
    } else {
        sneakers.map(sneaker => {
            const { name, category, price } = sneaker;
            if (category.toLowerCase() === searchValue) {
                // Agregar al array searchresult la sneaker
                // console.log(sneaker);
                searchResult.push(sneaker)
            } else if (name.toLowerCase().includes(searchValue)) {
                // console.log(sneaker);
                searchResult.push(sneaker)
            } else if (price.toString().includes(searchValue)) {
                // console.log(sneaker)
                searchResult.push(sneaker)
            }
        });
    }


    // Llamar funcion que tome como parametro el array searchResult y lo muestre en el DOM, limpiando lo anterior
    console.log(searchResult)
    console.log(searchValue)
    showSearchDOM(searchResult);
}

function showSearchDOM(arr) {
    cleanHTML();
    arr.map(sneaker => {
        const { id, name, category, price, stock, url } = sneaker;

        const div = document.createElement('div');
        div.classList.add('shoes-card');
        div.innerHTML = `
            <div class="card__img">
                <img src="${url}" alt="">
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
                <a href="#" class="add-to-cart" data-id="${id}">Add to cart</a>
            </div>
            `
        variable.shoesContainer.appendChild(div)


        // shoesContainerAll.appendChild(div);
    });

}