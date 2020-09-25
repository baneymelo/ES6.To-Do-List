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


const render = (userId) => {
    const objRender = JSON.parse(localStorage.getItem(userId));

    if (objRender.list) {
        const ulList = document.getElementById("name-list").querySelectorAll("ul")[0];

        for (const i of objRender.list) {
            const newLi = document.createElement("LI");
            newLi.innerText = i[0];
            ulList.appendChild(newLi);
        }
    }else{

    }
    
}



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
        }else{
            alert("Incorrect password")
        }
        
    } else {
        alert(`The user dont exist!`)
    }
    
});


/* SIGNUP */

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
            divNavigationbar.display = "flex";
        }

    /* console.log(JSON.parse(localStorage.getItem("user1")).name); */
    } else {
        alert("Incomplete information");
    }

    
})

/*
    DASHBOARD
*/



const list = {
    set: document.getElementById("add-list-input"),
    clear(){
        this.set.value = "";
    },
    task:{
        set:document.getElementById("add-task-input"),
        items:[]
    }
}


const ulParent = document.getElementById("name-list").querySelectorAll("ul")[0];
const addListButton = document.getElementById("add-list-button");



list.set.addEventListener("input", function(){
    console.log(list.set.value);
    switch (Boolean(list.set.value)) {
        case true:
            addListButton.disabled = false;
            break;
    
        case false:
            addListButton.disabled = true;
            break;
    }
});


render(localStorage.getItem("loginUser"));

addListButton.addEventListener("click", function(){
    const firstChild = ulParent.firstChild;
    const newLi = document.createElement("LI");

    newLi.innerText = list.set.value.toUpperCase();
    ulParent.insertBefore(newLi,firstChild);

    let itemsList = []
    let temp = JSON.parse(localStorage.getItem(localStorage.getItem("loginUser")));

        if (Object.keys(temp).length === 4) {
            itemsList.unshift([list.set.value.toUpperCase(),[]]);
            temp.list = itemsList;
            
        } else {
            temp.list.unshift([list.set.value.toUpperCase(),[]]);
        }
    
    localStorage.setItem(localStorage.getItem("loginUser"),JSON.stringify(temp)); 
    console.log(temp);
    list.clear();
    addListButton.disabled = true;
});


/* 
        ADD TASKS 
*/

/* Choice list */

const liSelected = ulParent.querySelectorAll("LI");

liSelected.forEach(e => {   
    e.addEventListener("click",function (ele) {
        document.getElementById("list-header").innerHTML = ele.path[0].innerText;
    });
});
    
const inputItem = document.querySelector("#add-task-input");

/* Enter input and save item*/

inputItem.addEventListener("keyup",function (e) {
    const headerList = document.getElementById("list-header");
    const temp = JSON.parse(localStorage.getItem(localStorage.getItem("loginUser")));
    
    if (e.keyCode === 13) {
        let ids = [];
        let itemsTask = [];
        for (const j in temp.list) {
            if(temp.list[j][0].toString() === headerList.innerHTML){
                ids = j;
            }
        }
        itemsTask = temp.list[ids];
        itemsTask[1].unshift(inputItem.value.toUpperCase());
        temp.list[ids] = itemsTask;
        localStorage.setItem(localStorage.getItem("loginUser"),JSON.stringify(temp));
    }
});