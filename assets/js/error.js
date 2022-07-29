import * as variable from "./variables.js"
import { cleanHTML } from "./app.js";
import { loadSelectedShoes } from "./loadshoes.js";
import { sneakers } from "./db.js";

export function showError(message) {
    cleanErrorHTML()
    // console.log(message);
    const alerta = document.createElement('p')
    alerta.style = 'background:red;color:white;width:510px;margin:1rem auto;padding:1rem;text-align:center;border-radius:5px;'
    alerta.innerText = message
    variable.errorContainer.appendChild(alerta)
    setTimeout(() => {
        alerta.remove();
        loadSelectedShoes(sneakers, "Tenis");
    }, 3500);
}


function cleanErrorHTML() {
    while (variable.errorContainer.firstChild) {
        variable.errorContainer.removeChild(variable.errorContainer.firstChild)
    }
}