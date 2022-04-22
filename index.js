let newActivity = document.querySelector('input');
let pendingActivityContainer = document.querySelector('#pending-tasks');
let finishedActivityContainer = document.querySelector('#finished-tasks');

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
            listElement.parentNode.removeChild(listElement);
            toDos.splice(toDos.findIndex((item, index) => index === listElement.id),1);
            localStorage.setItem('pendingTasks',JSON.stringify(toDos));
        })

        let checkIconElement = document.createElement('i');
        checkIconElement.classList.add('fa');
        checkIconElement.classList.add('fa-check-circle');
        checkIconElement.classList.add('taskicon');
        checkIconElement.addEventListener('click', () => {
            checkTask(item);
            listElement.parentNode.removeChild(listElement);
            toDos.splice(toDos.findIndex((item, index) => index === listElement.id),1);
            localStorage.setItem('pendingTasks',JSON.stringify(toDos));
        })

        listElement.append(spanElement, trashIconElement, checkIconElement);
        return listElement;
    });
    pendingActivityContainer.append(...toDoNodeList);
}

const doneTask = JSON.parse(localStorage.getItem('finishedTasks'));
if(doneTask){
    let doneTaskNodeList = doneTask.map((item, index) => {
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
            listElement.parentNode.removeChild(listElement);
            doneTask.splice(doneTask.findIndex((item, index) => index === listElement.id),1);
            localStorage.setItem('finishedTasks',JSON.stringify(doneTask));
        })

        listElement.append(spanElement, trashIconElement);
        return listElement;
    });
    finishedActivityContainer.append(...doneTaskNodeList);
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
    trashIconElement.addEventListener('click', () => {
        listElement.parentNode.removeChild(listElement);
        toDos.splice(toDos.findIndex((item, index) => index === listElement.id),1);
        localStorage.setItem('pendingTasks',JSON.stringify(toDos));
    })

    let checkIconElement = document.createElement('i');
    checkIconElement.classList.add('fa');
    checkIconElement.classList.add('fa-check-circle');
    checkIconElement.classList.add('taskicon');
    checkIconElement.addEventListener('click', () => {
        checkTask(newTask);
        listElement.parentNode.removeChild(listElement);
        toDos.splice(toDos.findIndex((item, index) => index === listElement.id),1);
        localStorage.setItem('pendingTasks',JSON.stringify(toDos));
    })

    listElement.append(spanElement, trashIconElement, checkIconElement);
    pendingActivityContainer.appendChild(listElement);
    newActivity.value = "";
    addToLocalStorage(newTask, "pending");
}

function checkTask(finishedTask){
    let listElement = document.createElement('li');
    let spanElement = document.createElement('span');
    spanElement.innerText = finishedTask;

    let trashIconElement = document.createElement('i');
    trashIconElement.classList.add('fa');
    trashIconElement.classList.add('fa-trash');
    trashIconElement.classList.add('taskicon');
    trashIconElement.addEventListener('click', () => {
        listElement.parentNode.removeChild(listElement);
        toDos.splice(toDos.findIndex((item, index) => index === listElement.id),1);
        localStorage.setItem('finishedTasks',JSON.stringify(toDos));
    })

    listElement.append(spanElement, trashIconElement);
    finishedActivityContainer.appendChild(listElement);
    addToLocalStorage(finishedTask, "completed");
}

newActivity.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addTask();
    }
});

function addToLocalStorage(task, taskType){
    if(taskType === "pending"){
        const toDos = JSON.parse(localStorage.getItem('pendingTasks'));
        if(toDos) {
            toDos.unshift(task);
            localStorage.setItem('pendingTasks',JSON.stringify(toDos));
        }else {
            localStorage.setItem('pendingTasks',JSON.stringify([task]))
        }
    }else{
        const doneTask = JSON.parse(localStorage.getItem('finishedTasks'));
        if(doneTask) {
            doneTask.unshift(task);
            localStorage.setItem('finishedTasks',JSON.stringify(doneTask));
        }else {
            localStorage.setItem('finishedTasks',JSON.stringify([task]))
        }
    }  
}