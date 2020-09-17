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
/* LOCALSTORAGE REGISTER DATA */

const captureLoginData = (logValue, pswValue) =>{
    localStorage.setItem('emailUser', logValue);
    localStorage.setItem('emailUserPsw', pswValue);
}

loginButton.addEventListener('click', function(){

    captureLoginData(inputEmailLogin.value, inputPswLogin.value);
    

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

/* LOCALSTORAGE REGISTER DATA */


/* Validate empty inputs  */

let regInputs = {
    regName: document.getElementById("reg-name"),
    regLname: document.getElementById("reg-lname"),
    regEmail: document.getElementById("reg-email"),
    regPsw: document.getElementById("reg-psw")
}

const validateEmptyInputs = () =>{

    let isEmpty = 0;
        
    Object.getOwnPropertyNames(regInputs).forEach(e => {
    
        switch (Boolean(regInputs[e].value)) {
            case true:
                isEmpty++;
                break;
        
            case false:
                isEmpty--;
                break;
        }
    })

    if (isEmpty !== 4) {
        return false;
    } else {
        return true;    
    }
}


/* SEARCHING EXISTING MAIL */


const sequentialSearch = (emailToBeSearched) =>{
    Object.getOwnPropertyNames(localStorage).forEach(e => {
        console.log(e, emailToBeSearched);
        if (e === emailToBeSearched) {
            return true;
            
        }else{
            return false;
        }
    });
    /* return -1;  */
}


const tycCheckbox = document.getElementById("tyc-checkbox");
const regButton = document.getElementById("register-button");

tycCheckbox.addEventListener("click", function(){
    switch (regButton.disabled) {
        case true:
            regButton.disabled = false;
            regButton.style.opacity = 1;
            break;
        case false:
            regButton.disabled = true;
            regButton.style.opacity = 0.4;
            break;
        default:
            break;
    }
});


regButton.addEventListener("click", function(){

    if (validateEmptyInputs()) {

                
        const userInfo = {
            name:regInputs.regName.value, lastname:regInputs.regLname.value, email:regInputs.regEmail.value, psw:regInputs.regPsw.value
        }

        if (sequentialSearch(userInfo.email)) {
            alert(`El usuario con correo ${userInfo.email} ya existe`)
            
        } else {
            localStorage.setItem(userInfo.email,JSON.stringify(userInfo));
            divsToChangeDisplay([formDiv[0]],[divDash[0]]);
            
        }

    /* console.log(JSON.parse(localStorage.getItem("user1")).name); */
    } else {
        alert("Incomplete information");
    }

    
})

/* tycCheckbox.checked ?  : regButton.disabled = true; */
