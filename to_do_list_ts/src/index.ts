
// declaring my own type for a to do element 
type ElementTask = {
    div : HTMLDivElement, 
    list : HTMLLIElement,
    content : string,
    complete_btn : HTMLButtonElement,
    remove_btn : HTMLButtonElement
}

// decalring the variables
let icon_button = document.querySelector(".add_to_do") as HTMLButtonElement;
let input_text = document.getElementById("to_do_input") as HTMLInputElement;
let select_option = document.getElementById("selecteaza") as HTMLSelectElement;
let to_do_list = document.querySelector(".list") as HTMLUListElement;
let clearButton = document.querySelector(".clearStorage") as HTMLButtonElement;
let todoArrayString = "todoArray";

// adding the event listeners after verifing that the element are not null 
if(icon_button!==null){
    icon_button.addEventListener("click",addAnTask);
}
if(select_option!==null){
    select_option.addEventListener("click",organizingTODO);
}
if(clearButton!==null){
    clearButton.addEventListener("click",clearLocalStorage);
}
document.addEventListener("DOMContentLoaded",loadSavedTODOS);

// function in witch i add a to do element to the ul list 
// in this function i create the intire to do in ts and i add that to the dom 
function addAnTask(event : Event) :void{
    if(input_text.value==="")
    {
        event.preventDefault();
        alert("ai input ul gol");
    } 
    else
    {
        event.preventDefault();
        // creez elementul todo care cuprinde div list elementul si butoanele 
        let toDoDiv :ElementTask = {
        div : document.createElement("div"),
        list : document.createElement("li"),
        content : input_text.textContent ?? "",
        complete_btn : document.createElement("button"),
        remove_btn : document.createElement("button")
    }
       // functia care creeaza si insereaza in dom tipul meu custom Element task
       createAndAddDiv(toDoDiv,input_text.value);
    }
}
// function that uses the select to organize the todo elements by the categories specified in the select element in html
function organizingTODO(event: Event) : void{
      let selectValue : string;
      let toDOArray =to_do_list.childNodes;
      if(event.target!==null){
              if(event.target instanceof HTMLSelectElement){
                     selectValue=event.target.value;
                     if(toDOArray.length!==1){  // verific daca lungimea node list ului de copii este nula
                        for(let i=1;i<toDOArray.length;i++){
                            switch(selectValue) {
                               case("All") : {
                                   (toDOArray[i] as HTMLDivElement).style.display="flex";
                                   break;
                               }
                               case ("Completed"): {
                                   if((toDOArray[i] as HTMLDivElement).classList.contains("checked")){
                                          (toDOArray[i] as HTMLDivElement).style.display="flex";
                                   } else{
                                       (toDOArray[i] as HTMLDivElement).style.display="none";
                                   }
                                   break;
                               }
                               case ("Uncompleted") : {
                                   if(!((toDOArray[i] as HTMLDivElement).classList.contains("checked"))){
                                       (toDOArray[i] as HTMLDivElement).style.display="flex";
                                    } else{
                                    (toDOArray[i] as HTMLDivElement).style.display="none";
                                  }
                                  break;
                               }
                                  
                          }
                       }
                     }
              }
    }
}
function saveLocalStorageInputs (todoInput : string) :void {
        let todoArray : string[]=[];
        if(localStorage.getItem(todoArrayString)===null){
              todoArray=[];
        } else{
            todoArray=JSON.parse(localStorage.getItem(todoArrayString) as string);
        }
        todoArray.push(todoInput);
        localStorage.setItem(todoArrayString,JSON.stringify(todoArray));
}
function setToDoState(todoInput : string , checked : boolean): void{  
          
            let checkedString : string = checked.toString();
            localStorage.setItem(todoInput,checkedString);

}

function clearLocalStorage() :void {
    localStorage.clear();
}

function loadSavedTODOS() : void{
    let todoInputArray :string[] = [];
    let toDoElements : ElementTask[] = [];
    if(localStorage.getItem(todoArrayString)!==null){
        todoInputArray=JSON.parse(localStorage.getItem(todoArrayString) as string);
    }
    let completeBool : boolean[] = [];
    for(let i=0;i<todoInputArray.length;i++){
        completeBool[i]= (localStorage.getItem(todoInputArray[i]) === "true");
    }
    for (let i=0;i<todoInputArray.length;i++){
           toDoElements[i]=createToDos(todoInputArray[i]);
           if(completeBool[i]===true){
                toDoElements[i].div.classList.add("checked");
           } 
           to_do_list.appendChild(toDoElements[i].div);
           addClasses(toDoElements[i]);
    }
}

function createAndAddDiv(toDoDiv : ElementTask,inputValue : string){
    toDoDiv.list.textContent=inputValue;
    saveLocalStorageInputs(inputValue);
    setToDoState(inputValue,false);
    input_text.value="";
    toDoDiv.complete_btn.innerHTML='<i class="fas fa-trash-alt"></i>';
    toDoDiv.remove_btn.innerHTML='<i class="far fa-check-square"></i>';
    toDoDiv.div.appendChild(toDoDiv.list);
    toDoDiv.div.appendChild(toDoDiv.complete_btn);
    toDoDiv.div.appendChild(toDoDiv.remove_btn);
    to_do_list.appendChild(toDoDiv.div);   
    toDoDiv.complete_btn.addEventListener("click" , ()=>{
        toDoDiv.div.classList.toggle("checked");
        if(toDoDiv.div.classList.contains("checked")){
            setToDoState(toDoDiv.list.textContent as string,true);
        } else{
            setToDoState(toDoDiv.list.textContent as string, false);
        }
    })
     toDoDiv.remove_btn.addEventListener("click",removeFunct);
     function removeFunct() :void{
         toDoDiv.div.classList.add("remove");
         removeLocalStorage(toDoDiv.list.textContent as string);
         toDoDiv.div.addEventListener("transitionend" , ()=>{
            toDoDiv.div.remove();
         })
         
     }
}

function removeLocalStorage(inputValue : string) : void{
         localStorage.removeItem(inputValue);
         let todoArray : string[] = JSON.parse(localStorage.getItem(todoArrayString) as string);
         let index = todoArray.indexOf(inputValue);
         todoArray.splice(index,1);
         localStorage.setItem(todoArrayString,JSON.stringify(todoArray));
}

function createToDos (inputValue : string) : ElementTask{
    let toDoDiv :ElementTask = {
        div : document.createElement("div"),
        list : document.createElement("li"),
        content : input_text.textContent ?? "",
        complete_btn : document.createElement("button"),
        remove_btn : document.createElement("button")
    }
        toDoDiv.complete_btn.innerHTML='<i class="fas fa-trash-alt"></i>';
        toDoDiv.remove_btn.innerHTML='<i class="far fa-check-square"></i>';
        toDoDiv.div.appendChild(toDoDiv.list);
        toDoDiv.div.appendChild(toDoDiv.complete_btn);
        toDoDiv.div.appendChild(toDoDiv.remove_btn);
        toDoDiv.list.textContent=inputValue;
        return toDoDiv;
}
function addClasses (toDoDiv : ElementTask) : void {
    toDoDiv.complete_btn.addEventListener("click" , ()=>{
        toDoDiv.div.classList.toggle("checked");
        if(toDoDiv.div.classList.contains("checked")){
            setToDoState(toDoDiv.list.textContent as string,true);
        } else{
            setToDoState(toDoDiv.list.textContent as string, false);
        }
    })
     toDoDiv.remove_btn.addEventListener("click",removeFunct);
     function removeFunct() :void{
         toDoDiv.div.classList.add("remove");
         removeLocalStorage(toDoDiv.list.textContent as string);
         toDoDiv.div.addEventListener("transitionend" , ()=>{
            toDoDiv.div.remove();
         })
         
     }
}