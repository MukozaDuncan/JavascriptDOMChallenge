let newActivity = document.querySelector('input');
let pendingActivityContainer = document.querySelector('#pending-tasks');

const toDos = JSON.parse(localStorage.getItem('pendingTasks'));
if(toDos){
    let toDoNodeList = toDos.map((item, index) => {
        let listElement = document.createElement('li');
        listElement.innerText = item;
        listElement.id = index;
        return listElement;
    });
    pendingActivityContainer.append(...toDoNodeList);
}

function addTask(){
    let newTask = newActivity.value;
    let listElement = document.createElement('li');
    listElement.innerText = newTask;
    pendingActivityContainer.appendChild(listElement);
    newActivity.value = "";
    addToLocalStorage(newTask);
}

newActivity.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addTask();
    }
});

function addToLocalStorage(todo){
    const toDos = JSON.parse(localStorage.getItem('pendingTasks'));
    if(toDos) {
        toDos.unshift(todo);
        localStorage.setItem('pendingTasks',JSON.stringify(toDos));
    }else {
        localStorage.setItem('pendingTasks',JSON.stringify([todo]))
    }
}