const validation = (input) => {
//input {email:--, pasword:--} es un obj con la info que recibe del estado userData
const error = {}; 
// error = {email:ERROR}

// validacion REGEX, sirve para validar si un email es valido
const regexEmail = /\S+@\S+\.\S+/; 
const regexPassword = new RegExp("[0-9]"); // esta es otra forma de validar

if(!regexEmail.test(input.email)) {  // si el test es negativo se cambia a + 
error.email = "¡Ingrese un email válido!";
}
if(!input.email){
error.email = "¡Debe ingresar su email!";
}
if(input.email.length > 35){
error.email = '¡Debe ser menor a 35 caracteres!'
}
if(!regexPassword.test(input.password)){
    error.password = '¡Debe contener al menos un número!'
}
if(input.password.length < 6 || input.password.length > 10){
    error.password = '¡Debe contener entre 6 y 10 carácteres!'
}

return error;

}







export default validation;