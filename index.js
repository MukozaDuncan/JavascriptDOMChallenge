let newActivity = document.querySelector('input');
let pendingActivityContainer = document.querySelector('#pending-tasks');

const toDos = JSON.parse(localStorage.getItem('pendingTasks'));
if(toDos){
    let toDoNodeList = toDos.map((item, index) => {
        let listElement = document.createElement('li');
        let spanElement = document.createElement('span');
        spanElement.innerText = item;
        listElement.id = index;
        listElement.classList.add('list-item');

        let trashIconElement = document.createElement('i');
        trashIconElement.classList.add('fa');
        trashIconElement.classList.add('fa-trash');
        trashIconElement.classList.add('taskicon');

        trashIconElement.addEventListener('click', () => {
            trashIconElement.parentNode.remove();
        })

        let checkIconElement = document.createElement('i');
        checkIconElement.classList.add('fa');
        checkIconElement.classList.add('fa-check-circle');
        checkIconElement.classList.add('taskicon');

        listElement.append(spanElement, trashIconElement, checkIconElement);
        return listElement;
    });
    pendingActivityContainer.append(...toDoNodeList);
}

function addTask(){
    let newTask = newActivity.value;
    let listElement = document.createElement('li');
    let spanElement = document.createElement('span');
    spanElement.innerText = newTask;

    let trashIconElement = document.createElement('i');
    trashIconElement.classList.add('fa');
    trashIconElement.classList.add('fa-trash');
    trashIconElement.classList.add('taskicon');

    let checkIconElement = document.createElement('i');
    checkIconElement.classList.add('fa');
    checkIconElement.classList.add('fa-check-circle');
    checkIconElement.classList.add('taskicon');

    listElement.append(spanElement, trashIconElement, checkIconElement);
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