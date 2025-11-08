//id del body
const body = document.getElementById("body");
//clases de los divs
const productos = document.querySelectorAll(".main__Container");
//todo lo que va dentro de la ventana modal 
const capaModal = document.getElementById("div__Cap-Productos");
const modalContent = document.getElementById("div__Modal-Content");
const imagenModal = document.getElementById("img__Modal");
const botonCerrar = document.getElementById("button__Cerrar-Modal");
const h2Modal = document.getElementById("div__Modal-h2");
const pModal = document.getElementById("div__Modal-p");
const aumento = document.getElementById("div__Modal-Mas");
const decremento = document.getElementById("div__Modal-Menos");
const inputCantidad = document.getElementById("div__Modal-Input");
const botonAceptar = document.getElementById("div__Modal-Aceptar");
// todo lo que tiene que ver con el carrito de compras
const abrirCarrito = document.getElementById("carrito__Button");
const contadorCarrito = document.getElementById("carrito__Contador");
const containerProductos = document.getElementById("div__Container-Carrito");

// variables que hacen referencia al nombre, precio, y cantidad de los productos para procesarlos con el botonAceptar
let nombreVariable = "";    
let precioVariable = 0;
let imgVariable = "";
//
productos.forEach(p => p.addEventListener("click", () => {
    capaModal.style.display = "block";
    imagenModal.src = p.dataset.img;
    body.classList = "body";
    //zona para establecer los elementos que se van a crear
    let nuevoB = document.createElement("button");
    //zona para establecer que haran los elementos ya creados
    pModal.textContent = `El producto es ${p.dataset.name} con un costo de ${p.dataset.price} y no cuenta con alergenos así que no tiene de que preocuparse a no ser que sea un maldito ser que no merezca siquieta respirar por que se muere`;
    h2Modal.textContent = p.dataset.name;
    nombreVariable = p.dataset.name;
    precioVariable = p.dataset.price;
    imgVariable = p.dataset.img;
}))
botonCerrar.addEventListener("click", () => {
    capaModal.style.display = "none";
    body.classList.remove("body");
})
aumento.addEventListener("click", (e) => {
    e.preventDefault()
    if(inputCantidad.value < 20) {
        inputCantidad.value++;
    }else {
        alert("Como máximo solo puedes agregar 20 unidades de un producto");
    }
})
decremento.addEventListener("click", (e) => {
        e.preventDefault()
    if(inputCantidad.value > 0) {
        inputCantidad.value--;
    }else {
        alert("No puedes colocar números negativos");
    }
});
    contadorCarrito.textContent = localStorage.getItem("contador")
//esto es un poco confuso, en esta parte colocare todo los que tenga que ver con el boton aceptar, aquí de igual forma irá el array y el localStorage dónde se colocaran todo los productos que se hayan agregado 
let newObject = JSON.parse(localStorage.getItem("containerDatosProducto")) || [];
botonAceptar.addEventListener("click", (e) => {
    e.preventDefault()
    if(inputCantidad.value < 1 || inputCantidad.value > 20) {
        inputCantidad.value = 0;
        return alert("Cantidad inválida, debe de ser mayor a cero o menor a veinte");
    }else {
        let buscador = newObject.find(p => p.name === nombreVariable);
        let buscador2 = buscador !== undefined;
            if(buscador2 === false) {
                newObject.push({name: nombreVariable, price: precioVariable, count: Number(inputCantidad.value), img: imgVariable});
                inputCantidad.value = 0;
            } else {
                let nuevo = Number(buscador.count) + Number(inputCantidad.value);
                buscador.count = nuevo;
                inputCantidad.value = 0;
            }
        localStorage.setItem("containerDatosProducto", JSON.stringify(newObject))
    }
    console.log(JSON.parse(localStorage.getItem("containerDatosProducto")));
    let count = newObject.reduce((acu, act) => {
        acu += Number(act.price) * Number(act.count);
        return acu
    }, 0);
    localStorage.setItem("contador", count);
    contadorCarrito.textContent = localStorage.getItem("contador");
});
//addeventlistener del carrito de compras

const templateCarrito = document.querySelector(".template__Carrito");
const containerProductosSingle = document.querySelector(".div__Container-Productos-Carrito");

abrirCarrito.addEventListener("click", () => {
    body.classList = "body";
    document.getElementById("div__Cap-Carrito").style.display = "block";
    newObject.forEach( e => {
        const data = templateCarrito.content.cloneNode("true");
        data.querySelector(".h3__Carrito").textContent = e.name;
        data.querySelector(".img__Productos").src = e.img;
        data.querySelector(".input__Productos").value = e.count;
        containerProductos.appendChild(data)
    });
})
const cerrar = document.getElementById("button__Cerrar-Carrito").addEventListener("click", () => {
    document.getElementById("div__Cap-Carrito").style.display = "none";
    containerProductos.innerHTML = " ";
    body.classList.remove("body");
})
const eliminarProductos = document.getElementById("button__Eliminar-Productos")
const aceptarProductos = document.getElementById("button__Aceptar-Productos");

eliminarProductos.addEventListener("click", () => {
    newObject = [];
    localStorage.clear();
    containerProductos.innerHTML = " ";
    contadorCarrito.textContent = 0
})
aceptarProductos.addEventListener("click", () => {
    alert("Los productos han sido enviados correctamente")
})