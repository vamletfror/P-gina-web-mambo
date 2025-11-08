//Aquí van los dos botones para abrir la reserva o el pedido
const botonPedido = document.getElementById("button_Pedido");
//Aquí van los id que tienen que ver con el formulario
const formulario = document.querySelector(".separador_Form");
const enviarForm = document.querySelector(".form_Reserva-Pedido")
const cerrarForm = document.getElementById("cerrar_Form");
const botonSiguiete = document.getElementById("button_Siguiente");
const nombre = document.getElementById("name");
const apellido = document.getElementById("last_Name");
const fecha = document.getElementById("dt");
const hora = document.getElementById("hr");
//Aquí van los id que tienen que ver con la barra de navegación

//Botones para abrir el forumulario de la reserva
botonPedido.addEventListener("click", () => {
    formulario.style.display = "flex";
});
//Todos los ibotonoes addEventListener que están dentro del formulario del a reserva
cerrarForm.addEventListener("click", () => {
    formulario.style.display = "none";
});
enviarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(nombre.value.trim() === "") {
        alert("Porfavor llene el campo del nombre");
        return
    }
    if(apellido.value.trim() === "") {
        alert("Porfavor llena el campo del apellido");
        return
    }
    if(fecha.value === "") {
        alert("Porfavor llene el campo de la fecha");
        return
    }
    if(hora.value === "") {
        alert("Porfavor llena el campo de la hora")
        return
    }
    enviarForm.submit()
});