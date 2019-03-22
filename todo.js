const toDoForm = document.querySelector(".js-toDoForm"),
     toDoInput = toDoForm.querySelector("input"),
     toDoList = document.querySelector(".js-toDoList");

     
const TODOS_LS = 'toDos';

//LS는 로컬스토리지

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(todo){
        return toDos.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
    //filter는 값이true인 어레이를 생성함.
}



function saveToDos () {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//자바는 로컬스토리지에 스트링만 저장하려함.JSON.stringify은 자바 오브젝트를 스트링으로 저장해줌.



function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length +1 ;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
      text : text,
      id : newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        //parse는 다시 오브젝트로 변경됨.
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
