"use strict";

const formDiv = document.getElementsByClassName("forms");
const divDash = document.getElementsByClassName("dashboard");
const divNavigationbar = document.getElementsByClassName("navigationbar");


/* const inputEmailLogin = document.getElementById("login-email");
const inputPswLogin = document.getElementById("login-psw"); */
const loginButton = document.getElementById("login-button");

const divsToChangeDisplay = ([...argsToNone],[...argsToFlex]) =>{

    for (const key of argsToNone) {
        key.style.display = "none";
    }
    for (const key of argsToFlex) {
        key.style.display = "flex";
    }    
}

let idList = 0;

//////////////////////////////// UlObject //////////////////////////////////

const UlObject = {
    saveDataToLocalStorage:function(userId,value,option,...ele){
        switch (option) {
            case "list":
            
                let itemsList = []
                let tempList = JSON.parse(localStorage.getItem(userId));

                    if (Object.keys(tempList).length === 4) {
                        itemsList.unshift([value,[]]);
                        tempList.list = itemsList;
                    
                    }else{
                        tempList.list.unshift([value,[]]);
                    }
        
                localStorage.setItem(localStorage.getItem("loginUser"),JSON.stringify(tempList)); 
                regData.list.clear();
                regData.list.button.disabled = true;
            
            break;
        
            case "task":
                const tempTask = JSON.parse(localStorage.getItem(userId));
                
                if (ele[0].keyCode === 13) {

                    if (value) {
                        tempTask.list[idList][1].unshift(value);
                        localStorage.setItem(localStorage.getItem("loginUser"),JSON.stringify(tempTask));
                        regData.task.clear();
                    } else {
                        alert("Empty fields are not accepted, please enter a value");    
                    }   
                }             
            break;
        }
    },
    render:function(userId,option){
        switch (option) {
            case "list":
                const ulListParent = document.querySelector("#ul-list");
                ulListParent.parentNode.removeChild(ulListParent);

                const divListParent = document.querySelector("#name-list");
                const newUl = document.createElement("UL");
                newUl.id = "ul-list";
                divListParent.appendChild(newUl);

                const objL = JSON.parse(localStorage.getItem(userId));

                    if (objL.list) {            
                        for (const i in objL.list) {
                            const newLi = document.createElement("LI");
                            newLi.innerText = objL.list[i][0];
                            newLi.id = i;
                            newUl.appendChild(newLi);
                        }
                    }else{
                        false;
                    }

            break;
        
            case "task":
                /* const ulTaskParent = document.querySelector("#ul-task");
                ulParent.parentNode.removeChild(ulTaskParent);

                const divTaskParent = document.querySelector("#name-task");
                const newUl = document.createElement("UL");
                newUl.id = "ul-task";
                divTaskParent.appendChild(newUl); */
                const headerList = document.querySelector("#list-header").innerText;
                const objT = JSON.parse(localStorage.getItem(userId));
                console.log(objT.list[idList][1]);
                if (headerList !== "Select a list") {
                    console.log(objT.list[idList][1]);
                } else {
                    false;
                }
                 /*
                 objT.list[idList][1].forEach(e =>{
                    console.log(e);
                });
                    
                    if (objT.list[idList]) {            
                        for (const i in objT.list) {
                            const newLi = document.createElement("LI");
                            newLi.innerText = objT.list[i][0];
                            newLi.id = i;
                            newUl.appendChild(newLi);
                        }
                    }else{
                        false;
                    }  */

            break;
        }
    },
    liAddEvent:function(){
        const ulList = document.querySelector("#ul-list");
        const liList = ulList.querySelectorAll("li");
        
        liList.forEach(li => {
            li.addEventListener("click", () =>{
                document.querySelector("#list-header").textContent = li.innerText; 
                idList = li.id;
            });
        });
        document.querySelector("#total-list").textContent = liList.length;
        
    }
}

//////////////////////////////// UlObject //////////////////////////////////

 /* LOGIN */

let loginUser = {
    email: document.getElementById("login-email"),
    psw: document.getElementById("login-psw")
}

loginButton.addEventListener('click', function(){

    if (sequentialSearch(loginUser.email.value)) {

        if(JSON.parse(localStorage.getItem(loginUser.email.value)).psw === loginUser.psw.value){
            divsToChangeDisplay([formDiv[0]],[divDash[0],divNavigationbar[0]]);
            localStorage.setItem("loginUser", loginUser.email.value);
            UlObject.render(localStorage.getItem("loginUser"),"list");
        }else{
            alert("Incorrect password")
        }
        
    } else {
        alert(`The user dont exist!`)
    }
    
});


/* SIGNUP FORM */

const signupButton = document.getElementById('signup-button');
const signupDiv = document.getElementsByClassName('f-signup');
const loginDiv = document.getElementsByClassName('f-login');

signupButton.addEventListener('click', function() {    
    divsToChangeDisplay([loginDiv[0]],[signupDiv[0]]);
})

/* 
        LOCALSTORAGE REGISTER USER DATA 
*/

/* Validate empty inputs  */

let regInputs = {
    regName: document.getElementById("reg-name"),
    regLname: document.getElementById("reg-lname"),
    regEmail: document.getElementById("reg-email"),
    regPsw: document.getElementById("reg-psw")
}

const validateEmptyInputs = (input) =>{

    let isEmpty = 0;
        
    Object.getOwnPropertyNames(input).forEach(e => {
    
        switch (Boolean(input[e].value)) {
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
    let flag = false;
    Object.getOwnPropertyNames(localStorage).forEach(e => {
        switch (e) {
            case emailToBeSearched:
                flag = true;
                break;
        
            default:
                break;
        }
    });
    return flag;
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

    if (validateEmptyInputs(regInputs)) {

                
        const userInfo = {
            name:regInputs.regName.value, 
            lastname:regInputs.regLname.value, 
            email:regInputs.regEmail.value, 
            psw:regInputs.regPsw.value
        }

        if (sequentialSearch(userInfo.email)) {
            alert(`The user wit email ${userInfo.email} already exist!`)
            
        } else {
            localStorage.setItem(userInfo.email,JSON.stringify(userInfo));
            divsToChangeDisplay([formDiv[0]],[divDash[0]]);
            localStorage.setItem("loginUser", userInfo.email);
            UlObject.render(localStorage.getItem("loginUser"),"list");
        }

    /* console.log(JSON.parse(localStorage.getItem("user1")).name); */
    } else {
        alert("Incomplete information");
    }

    
})


/*
    DASHBOARD
*/

UlObject.render(localStorage.getItem("loginUser"),"list");
UlObject.render(localStorage.getItem("loginUser"),"task");
UlObject.liAddEvent();

const regData = {
    list:{
        input: document.querySelector("#add-list-input"),
        button: document.querySelector("#add-list-button"),
        clear(){
            this.input.value = "";
        }
    },
    task:{
        input: document.querySelector("#add-task-input"),
        clear(){
            this.input.value = "";
        }
    }
}



regData.list.input.addEventListener("input", function(){
    switch (Boolean(regData.list.input.value)) {
        case true:
            regData.list.button.disabled = false;
            break;
    
        case false:
            regData.list.button.disabled = true;
            break;
    }
});


regData.list.button.addEventListener("click", function(){
    const userId = localStorage.getItem("loginUser");
    const inputValue = regData.list.input.value.toUpperCase();
    UlObject.saveDataToLocalStorage(userId,inputValue,"list");
    UlObject.render(userId,"list");
    UlObject.liAddEvent();
});

/* 
        ADD TASKS 
*/
    
/* Save tasks and render*/

regData.task.input.addEventListener("keyup",function (e) {
    
    const userId = localStorage.getItem("loginUser");
    const inputValue = regData.task.input.value.toUpperCase();
    UlObject.saveDataToLocalStorage(userId,inputValue,"task",e);
    UlObject.render(userId,"task");
});