const btn = document.querySelector(".navBar__btn");
const panel = document.querySelector(".panel");
const menu = document.querySelector(".menu");
const menuAnchors = document.querySelectorAll(".menu a");

export function hamburguerMenu() {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.classList.toggle("is-active")
        panel.classList.toggle("is-active")
    });
}

// Falta que cuando hagamos click en el boton dentro del nav, le quite la clase "is-active" al menu