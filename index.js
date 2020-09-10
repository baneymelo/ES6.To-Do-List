"use strict";

const formDiv = document.getElementsByClassName("forms");
const divDash = document.getElementsByClassName("dashboard");

const inputEmailLogin = document.getElementById("login-email");
const inputPswLogin = document.getElementById("login-psw");
const loginButton = document.getElementById("login-button");

const divsToChangeDisplay = ([...argsToNone],[...argsToFlex]) =>{

    for (const key of argsToNone) {
        key.style.display = "none";
    }
    for (const key of argsToFlex) {
        key.style.display = "flex";
    }    
}

/* loginOffDashOn(); */

const email = "1234@gmail.com";
const psw = "1234";


const captureData = (logValue, pswValue) =>{
    localStorage.setItem('emailUser', logValue);
    localStorage.setItem('emailUserPsw', pswValue);
}

loginButton.addEventListener('click', function(){

    captureData(inputEmailLogin.value, inputPswLogin.value);
    

    if((localStorage.getItem("emailUser") === email) && (localStorage.getItem("emailUserPsw") === psw)){
        divsToChangeDisplay([formDiv[0]],[divDash[0]]);
        
    }else{
        alert("Datos incorrectos!")
    }
});


/* SIGNUP */

const signupButton = document.getElementById('signup-button');
const signupDiv = document.getElementsByClassName('f-signup');
const loginDiv = document.getElementsByClassName('f-login');

signupButton.addEventListener('click', function() {    
    divsToChangeDisplay([loginDiv[0]],[signupDiv[0]]);
})