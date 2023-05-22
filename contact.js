const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const mensaje = document.getElementById("mensaje")
const form = document.getElementById("form")

const alerta = document.getElementById("alerta")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let alerta = ""
    let entrar = false
    let regexcorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let regextelefono = Number

    parrafo.innerHTML = ""
    if(nombre.value.length <2){
        alerta += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexcorreo.test(correo.value)){
        alerta += `El correo no es valido <br>`
        entrar = true
    }

    if(!regextelefono.test(telefono.value)){
        alerta += `El numero no es valido <br>`
        entrar = true
    }
    if(mensaje.value.length <2){
        alerta += `El nombre no es valido <br>`
        entrar = true
   
    if(entrar){
        alerta.innerHTML = alerta
    }else{
        alerta.innerHTML = "Enviado"
    }
})