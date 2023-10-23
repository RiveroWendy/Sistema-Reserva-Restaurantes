function main() {
    let formulario = document.querySelector("#form-reserva-cliente");
    formulario.addEventListener("submit", enviarForm);
    let inputFechaReserva = document.querySelector("#fecha-reserva-cliente");
    inputFechaReserva.addEventListener("change", obtenerFechaHoraReserva);
    inputFechaReserva.addEventListener("change", verificarFechaIngresada);
    let inputHoraReserva = document.querySelector("#hora-reserva-cliente");
    inputHoraReserva.addEventListener("change", obtenerFechaHoraReserva);
    inputHoraReserva.addEventListener("change", verificarHoraIngresada);
    let menuComensal = document.querySelector("#cantidad-reserva-cliente");
    menuComensal.addEventListener("change", menuComensales);
   
}

function enviarForm(e) {
    e.preventDefault();
    verificarCamposNulos();
}
function verificarCamposNulos() {
    let fechaReserva = document.getElementById("fecha-reserva-cliente").value;
    let horaReserva = document.getElementById("hora-reserva-cliente").value;
    let duracionReserva = document.getElementById("duracion-reserva-cliente").value;
    let cantidadReserva = document.getElementById("cantidad-reserva-cliente").value;
    let platoReserva = document.getElementById("plato-reserva-cliente").value;
    let pagoReserva = document.getElementById("pago-reserva-cliente").value;

    if (fechaReserva.trim() === "") {
        console.log("Fecha es required.");
        return;
    }

    if (horaReserva.trim() === "") {
        console.log("Hora es required.");
        return;
    }

    if (duracionReserva === "") {
        console.log("Duración de reserva es required.");
        return;
    }

    if (cantidadReserva === "") {
        console.log("Cantidad de comensales es required.");
        return;
    }

    if (platoReserva === "") {
        console.log("Plato es required.");
        return;
    }

    if (pagoReserva === "") {
        console.log("Método de pago es required.");
        return;
    }
}


function obtenerFechaHoraReserva() {
    let inputFechaReserva = document.getElementById("fecha-reserva-cliente");
    let inputHoraReserva = document.getElementById("hora-reserva-cliente");
    tiempoLimiteReserva(inputFechaReserva, inputHoraReserva);
}


function tiempoLimiteReserva(fecha, hora) {
    let mensaje = document.querySelector("#mensaje-reserva");
    let temporizador = document.querySelector("#temporizador");
    if (fecha.value && hora.value) {
        mensaje.classList.remove("d-none");
        temporizador.classList.remove("d-none");
        iniciarTemporizador();
    }
    else {
        mensaje.classList.add("d-none");
        temporizador.classList.add("d-none");
    }
}
function iniciarTemporizador(){
    //Tiempo limite para confirmar la reserva o te redirige al buscador
    let temporizador = document.querySelector("#temporizador");
    let segundos = 20;
const timer = setInterval(()=>{
    console.log(segundos);
    segundos--;
    temporizador.innerHTML = segundos;
    if(segundos == 0){
        limpiarTemporizador(timer);
        window.location = "cliente_busqueda.html"
    }
},1000);
}

function limpiarTemporizador(timer){
    clearInterval(timer);
}

function verificarHoraIngresada(){
    //Validar hora, no puede ser fuera del rango
    let horaInput = document.getElementById("hora-reserva-cliente");
    let horaIngresada = horaInput.value;
    let partesHora = horaIngresada.split(":");
    let horas = parseInt(partesHora[0], 10);
    if (horas < 9 || horas >= 20) {
        console.log("Por favor, ingrese una hora entre las 9 am y las 8 pm (20:00).")
        horaInput.value = "";
    }

}
function verificarFechaIngresada() {
    //Validar fecha, no puede ser la de hoy y tampoco más de una semana después
    let fechaInput = document.getElementById("fecha-reserva-cliente");
    let fechaManana = new Date();
    fechaManana.setDate(fechaManana.getDate() + 1);

    let fechaUnaSemanaDespues = new Date();
    fechaUnaSemanaDespues.setDate(fechaUnaSemanaDespues.getDate() + 7);

    let fechaIngresada = new Date(fechaInput.value);
    console.log("Fecha ingresada: " + fechaIngresada);
    console.log("Fecha mañana: " + fechaManana);

    if (fechaIngresada < fechaManana || fechaIngresada > fechaUnaSemanaDespues) {
        console.log("Por favor, ingrese una fecha que sea mañana o hasta una semana después.");
        fechaInput.value = ""; 
    }
}

function menuComensales(){
        let cantidadSelect = document.querySelector("#cantidad-reserva-cliente");
        let menuComensal = document.querySelector("#menu-comensal");
        menuComensal.innerHTML="";
        let cantidadComensales = parseInt(cantidadSelect.value);
        console.log(cantidadComensales);
        for (let i = 1; i <= cantidadComensales; i++) {
            let label = document.createElement("label");
            label.textContent = `Comensal ${i}`;

            let select = document.createElement("select");
            select.classList.add("form-select");
            select.id = `plato-reserva-comensal-${i}`;
            select.required = true;

            for (let j = 1; j <= 5; j++) {
               let option = document.createElement("option");
                option.value = j;
                option.textContent = j;
                select.appendChild(option);
            }

            menuComensal.appendChild(label);
            menuComensal.appendChild(select);
        }
}

window.onload = main;