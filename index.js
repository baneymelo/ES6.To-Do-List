"use strict";

const formDiv = document.getElementsByClassName("forms");
const divDash = document.getElementsByClassName("dashboard");
const divNavigationbar = document.getElementsByClassName("navigationbar");
const settings = document.querySelector(".settings");

//
const divLogin = document.querySelector(".f-login")
const divSign = document.querySelector(".f-signup");

const loginButton = document.getElementById("login-button");

const divsToChangeDisplay = ([...argsToNone],[...argsToFlex]) =>{

    argsToNone.forEach(e => {
        e.style.display = "none";
    });

    argsToFlex.forEach(e => {
        e.style.display = "flex"
    })
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
                        tempTask.list[idList][1].unshift([value,0]);
                        localStorage.setItem(localStorage.getItem("loginUser"),JSON.stringify(tempTask));
                        regData.task.clear();
                    } else {
                        console.log("Empty fields are not accepted, please enter a value");    
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
                            newLi.id = "l"+i;
                            newUl.appendChild(newLi);
                        }
                    }else{
                        false;
                    }

            break;
        
            case "task":
                
                const ulTask = document.querySelector("#ul-task");
                ulTask.parentNode.removeChild(ulTask);

                const divTask = document.querySelector("#div-task");
                const newTul = document.createElement("UL");
                newTul.id = "ul-task";
                divTask.appendChild(newTul); 

                const objT = JSON.parse(localStorage.getItem(userId));
                
                if (document.querySelector("#list-header").innerText !== "Select a list") {
                    for (const v of objT.list[idList][1]) {
                                                
                        const newLi = document.createElement("LI");
                        const newH4 = document.createElement("H4");
                        v[1] === 1? newH4.style.textDecoration = "line-through" : false;
                        newH4.innerText = v[0];                    
                        newLi.appendChild(newH4);
                        newTul.appendChild(newLi);
                        document.querySelector("#edit-button").disabled = false;
                    }  
                }
                    
            break;
            }
    },
    
    taskCompleted:function(userId,element,nameTask){
       
        const objTask = JSON.parse(localStorage.getItem(userId));
        
        for (const t of objTask.list[idList][1]) {
            if (nameTask === t[0]) {
                t[1] === 0 
                ? ( t[1] = 1, element.textDecoration = "line-through", localStorage.setItem(userId,JSON.stringify(objTask)) )
                : ( t[1] = 0, element.textDecoration = "none", localStorage.setItem(userId,JSON.stringify(objTask)) )
            }
        }
    }
}

//////////////////////////////// UlObject //////////////////////////////////

 // LOGIN 

let loginUser = {
    email: document.getElementById("login-email"),
    psw: document.getElementById("login-psw")
}

loginButton.addEventListener('click', function(){

    if (sequentialSearch(loginUser.email.value)) {

        if(JSON.parse(localStorage.getItem(loginUser.email.value)).psw === loginUser.psw.value){
            divsToChangeDisplay([formDiv[0]],[divDash[0],divNavigationbar[0]]);
            localStorage.setItem("loginUser", loginUser.email.value);
            console.log("oliwis");
            UlObject.render(localStorage.getItem("loginUser"),"list");
        }else{
            alert("Incorrect password")
        }
        
    } else {
        alert(`The user dont exist!`)
    }
    
});


// SIGNUP FORM 

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
            divsToChangeDisplay([formDiv[0]],[divDash[0],divNavigationbar[0]]);
            localStorage.setItem("loginUser", userInfo.email);
            UlObject.render(localStorage.getItem("loginUser"),"list");
        }

    } else {
        alert("Incomplete information");
    }

    
})


/*
    DASHBOARD
*/

/* divNavigationbar[0].style.display = "flex"; */

UlObject.render(localStorage.getItem("loginUser"),"list");
UlObject.render(localStorage.getItem("loginUser"),"task");

const totalList = () =>{
    const tl = document.querySelector("#ul-list");
    const totalList = document.querySelector("#total-list");

    totalList.innerHTML = tl.children.length;
}

totalList();


const renameList = {
    button: document.querySelector("#edit-button"),
    input: document.querySelector("#edit-input"),
    clear:function(){
        this.input.value = "";
    },
    display:function(){
        this.input.style.display = "inline",
        this.button.innerText = "SAVE"
    },
    reset:function(){
       this.input.style.display = "none",
       this.button.innerText = "EDIT"
    }
}

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


// CONTROLLER:

document.body.addEventListener("click", function(e){
    
    const userId = localStorage.getItem("loginUser");
    const listSelected = document.querySelector("#list-header");
    
    const tgt = e.target;
    let key;
    console.log(e);
    if (tgt.nodeName === "LI" && Boolean(tgt.id)) {
        key = "list";
    }else if (tgt.nodeName === "H4") {
        key = "task";
    }else if (tgt.innerText === "Logout") {
        divsToChangeDisplay([divDash[0],divNavigationbar[0],divSign],[formDiv[0], divLogin]);
        
        localStorage.setItem("loginUser","");
    }else if (tgt.innerText === "Account settings"){
        divDash[0].style.display = "none";            
        settings.style.display = "flex";
        
        const userInfo = JSON.parse(localStorage.getItem(userId));
        const nameInput = document.querySelector("#name");
        const lnameInput = document.querySelector("#lname");
        const emailInput = document.querySelector("#email");
        const passInput = document.querySelector("#pass");
        const saveChanges = document.querySelector("#sc");
            
        nameInput.value = userInfo.name;
        lnameInput.value = userInfo.lastname;
        emailInput.value = userInfo.email;
        passInput.value = userInfo.psw;
        
        
        saveChanges.addEventListener("click",function(){
            userInfo.name = nameInput.value; 
            userInfo.lastname = lnameInput.value;
            userInfo.email = emailInput.value;
            userInfo.psw = passInput.value;
            
            localStorage.removeItem(userId);
            localStorage.setItem(userInfo.email,JSON.stringify(userInfo));
            localStorage.setItem("loginUser",userInfo.email);

            divsToChangeDisplay([settings],[divDash[0]]);

            UlObject.render(localStorage.getItem("loginUser"),"list");
            UlObject.render(localStorage.getItem("loginUser"),"task");
        });
    }

    switch (key) {
        case "list":
            idList = Number(tgt.id.substring(1));
            listSelected.innerText = tgt.innerText; 
            UlObject.render(userId,"task");
            renameList.reset();
        break;
    
        case "task":
            UlObject.taskCompleted(userId,tgt.style,tgt.innerText);
        break;
    }

});



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

// ADD LIST

regData.list.button.addEventListener("click", function(){
    const userId = localStorage.getItem("loginUser");
    const inputValue = regData.list.input.value.toUpperCase();
    UlObject.saveDataToLocalStorage(userId,inputValue,"list");
    UlObject.render(userId,"list");
    totalList();
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


renameList.button.addEventListener("click",function(){

    switch (renameList.button.innerText) {

        case "EDIT":
            renameList.display();
            break;
    
        case "SAVE":
            
            const v = renameList.input.value.toUpperCase();
            const userId = localStorage.getItem("loginUser");
            const objToRename = JSON.parse(localStorage.getItem(userId));

            objToRename.list[idList][0] = v;
            document.querySelector("#list-header").innerText = v;
            document.getElementById(`l${idList}`).innerText = v;
            renameList.clear();
            renameList.reset();

            localStorage.setItem(userId,JSON.stringify(objToRename));
            UlObject.render(userId,"list");
            break;
    }
});