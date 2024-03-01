"use strict";
// decalring the variables
let icon_button = document.querySelector(".add_to_do");
let input_text = document.getElementById("to_do_input");
let select_option = document.getElementById("selecteaza");
let to_do_list = document.querySelector(".list");
let clearButton = document.querySelector(".clearStorage");
let todoArrayString = "todoArray";
// adding the event listeners after verifing that the element are not null 
if (icon_button !== null) {
    icon_button.addEventListener("click", addAnTask);
}
if (select_option !== null) {
    select_option.addEventListener("click", organizingTODO);
}
if (clearButton !== null) {
    clearButton.addEventListener("click", clearLocalStorage);
}
document.addEventListener("DOMContentLoaded", loadSavedTODOS);
// function in witch i add a to do element to the ul list 
// in this function i create the intire to do in ts and i add that to the dom 
function addAnTask(event) {
    var _a;
    if (input_text.value === "") {
        event.preventDefault();
        alert("ai input ul gol");
    }
    else {
        event.preventDefault();
        // creez elementul todo care cuprinde div list elementul si butoanele 
        let toDoDiv = {
            div: document.createElement("div"),
            list: document.createElement("li"),
            content: (_a = input_text.textContent) !== null && _a !== void 0 ? _a : "",
            complete_btn: document.createElement("button"),
            remove_btn: document.createElement("button")
        };
        // functia care creeaza si insereaza in dom tipul meu custom Element task
        createAndAddDiv(toDoDiv, input_text.value);
    }
}
// function that uses the select to organize the todo elements by the categories specified in the select element in html
function organizingTODO(event) {
    let selectValue;
    let toDOArray = to_do_list.childNodes;
    if (event.target !== null) {
        if (event.target instanceof HTMLSelectElement) {
            selectValue = event.target.value;
            if (toDOArray.length !== 1) { // verific daca lungimea node list ului de copii este nula
                for (let i = 1; i < toDOArray.length; i++) {
                    switch (selectValue) {
                        case ("All"): {
                            toDOArray[i].style.display = "flex";
                            break;
                        }
                        case ("Completed"): {
                            if (toDOArray[i].classList.contains("checked")) {
                                toDOArray[i].style.display = "flex";
                            }
                            else {
                                toDOArray[i].style.display = "none";
                            }
                            break;
                        }
                        case ("Uncompleted"): {
                            if (!(toDOArray[i].classList.contains("checked"))) {
                                toDOArray[i].style.display = "flex";
                            }
                            else {
                                toDOArray[i].style.display = "none";
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}
function saveLocalStorageInputs(todoInput) {
    let todoArray = [];
    if (localStorage.getItem(todoArrayString) === null) {
        todoArray = [];
    }
    else {
        todoArray = JSON.parse(localStorage.getItem(todoArrayString));
    }
    todoArray.push(todoInput);
    localStorage.setItem(todoArrayString, JSON.stringify(todoArray));
}
function setToDoState(todoInput, checked) {
    let checkedString = checked.toString();
    localStorage.setItem(todoInput, checkedString);
}
function clearLocalStorage() {
    localStorage.clear();
}
function loadSavedTODOS() {
    let todoInputArray = [];
    let toDoElements = [];
    if (localStorage.getItem(todoArrayString) !== null) {
        todoInputArray = JSON.parse(localStorage.getItem(todoArrayString));
    }
    let completeBool = [];
    for (let i = 0; i < todoInputArray.length; i++) {
        completeBool[i] = (localStorage.getItem(todoInputArray[i]) === "true");
    }
    for (let i = 0; i < todoInputArray.length; i++) {
        toDoElements[i] = createToDos(todoInputArray[i]);
        if (completeBool[i] === true) {
            toDoElements[i].div.classList.add("checked");
        }
        to_do_list.appendChild(toDoElements[i].div);
        addClasses(toDoElements[i]);
    }
}
function createAndAddDiv(toDoDiv, inputValue) {
    toDoDiv.list.textContent = inputValue;
    saveLocalStorageInputs(inputValue);
    setToDoState(inputValue, false);
    input_text.value = "";
    toDoDiv.complete_btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    toDoDiv.remove_btn.innerHTML = '<i class="far fa-check-square"></i>';
    toDoDiv.div.appendChild(toDoDiv.list);
    toDoDiv.div.appendChild(toDoDiv.complete_btn);
    toDoDiv.div.appendChild(toDoDiv.remove_btn);
    to_do_list.appendChild(toDoDiv.div);
    toDoDiv.complete_btn.addEventListener("click", () => {
        toDoDiv.div.classList.toggle("checked");
        if (toDoDiv.div.classList.contains("checked")) {
            setToDoState(toDoDiv.list.textContent, true);
        }
        else {
            setToDoState(toDoDiv.list.textContent, false);
        }
    });
    toDoDiv.remove_btn.addEventListener("click", removeFunct);
    function removeFunct() {
        toDoDiv.div.classList.add("remove");
        removeLocalStorage(toDoDiv.list.textContent);
        toDoDiv.div.addEventListener("transitionend", () => {
            toDoDiv.div.remove();
        });
    }
}
function removeLocalStorage(inputValue) {
    localStorage.removeItem(inputValue);
    let todoArray = JSON.parse(localStorage.getItem(todoArrayString));
    let index = todoArray.indexOf(inputValue);
    todoArray.splice(index, 1);
    localStorage.setItem(todoArrayString, JSON.stringify(todoArray));
}
function createToDos(inputValue) {
    var _a;
    let toDoDiv = {
        div: document.createElement("div"),
        list: document.createElement("li"),
        content: (_a = input_text.textContent) !== null && _a !== void 0 ? _a : "",
        complete_btn: document.createElement("button"),
        remove_btn: document.createElement("button")
    };
    toDoDiv.complete_btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    toDoDiv.remove_btn.innerHTML = '<i class="far fa-check-square"></i>';
    toDoDiv.div.appendChild(toDoDiv.list);
    toDoDiv.div.appendChild(toDoDiv.complete_btn);
    toDoDiv.div.appendChild(toDoDiv.remove_btn);
    toDoDiv.list.textContent = inputValue;
    return toDoDiv;
}
function addClasses(toDoDiv) {
    toDoDiv.complete_btn.addEventListener("click", () => {
        toDoDiv.div.classList.toggle("checked");
        if (toDoDiv.div.classList.contains("checked")) {
            setToDoState(toDoDiv.list.textContent, true);
        }
        else {
            setToDoState(toDoDiv.list.textContent, false);
        }
    });
    toDoDiv.remove_btn.addEventListener("click", removeFunct);
    function removeFunct() {
        toDoDiv.div.classList.add("remove");
        removeLocalStorage(toDoDiv.list.textContent);
        toDoDiv.div.addEventListener("transitionend", () => {
            toDoDiv.div.remove();
        });
    }
}
