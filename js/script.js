const optionChangeName = document.querySelector('.option')
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const greeting = document.querySelector('.greeting-title')
const nameUser = document.querySelector('.greeting-name')
const progressActivity = document.querySelector('.progress-activity')
const date = document.querySelector('.date')

immediateLoadEventListener()

function immediateLoadEventListener() {
    greetingTime()
    dateTime()
    document.addEventListener('DOMContentLoaded', getTodos)
    document.addEventListener('DOMContentLoaded', getName)
    optionChangeName.addEventListener('click', changeName)
    todoForm.addEventListener('submit', addTodo)
    todoList.addEventListener('click', checkList)
}

// Time Greeting
function greetingTime(name) {
    if (name) {
        names = name
    } else {
        names = ''
    }
    var d = new Date()
    var time = d.getHours()
    if (time > 3 && time < 12) {
        greeting.innerHTML = `<p class="greeting-title">Good Morning<span class="greeting-name"><br>${names}</span></p>`
    } else if (time < 18) {
        greeting.innerHTML = `<p class="greeting-title">Good Afternoon<span class="greeting-name"><br>${names}</span></p>`
    } else if (time >= 18 && time < 22) {
        greeting.innerHTML = `<p class="greeting-title">Good Evening<span class="greeting-name"><br>${names}</span></p>`
    } else {
        greeting.innerHTML = `<p class="greeting-title">Good Night<span class="greeting-name"><br>${names}</span></p>`
    }
}

// Option Nama User
function changeName() {
    new Attention.Prompt({
        title: 'Option',
        content: 'Enter your name : ',
        placeholderText: '', // custom placeholder
        submitText: 'Save', // custom submit text
        onSubmit(component, value) {
            var name = value
            addNameToLocalStorage(name)
            greetingTime(name)
        }
    });
}

// Membuat todo Elemen
function createTodoElement(value) {
    const li = document.createElement('li')
    li.className = 'list-item'

    const span = document.createElement('span')

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.className = 'checkbox'

    span.appendChild(input)

    li.appendChild(span)
    li.appendChild(document.createTextNode(value))

    todoList.appendChild(li)

    console.log(todoList)
}

// input todo
function addTodo(e) {
    if (todoInput.value) {
        e.preventDefault()
        createTodoElement(todoInput.value)
        addToLocalStorage(todoInput.value)
        todoInput.value = ''
    } else {
        
    }
    updateActivity()
}

// check List
function checkList(e) {
    const parent = e.target.parentElement.parentElement
    if (e.target.classList.contains('checkbox')) {
        parent.classList.add('checklist')
        setTimeout(() => {
            deleteTodoFromLocalStorage(parent)
            parent.remove()
            updateActivity()
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Your task complete'
            })
        }, 500);
    }
}

// date
function dateTime() {
    var today = new Date();
    var resultsDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    date.innerHTML = resultsDate
}

function updateActivity() {
    var list = document.getElementsByTagName("li").length;
    progressActivity.innerHTML = list + ' Activities'
}

function getItemFromLocalStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}

// Memasukan todo ke dalam localstorage
function addToLocalStorage(todoInputValue) {
    const todos = getItemFromLocalStorage()
    todos.push(todoInputValue)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Mengambil data todos dari dalam local storage
function getTodos() {
    const todos = getItemFromLocalStorage()
    todos.forEach((todo) => {
        createTodoElement(todo)
    })
    updateActivity()
}

// delete todo dari localstorage
function deleteTodoFromLocalStorage(deletedElement) {
    const todos = getItemFromLocalStorage()
    todos.forEach((todo, index) => {
        if (deletedElement.textContent === todo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Names local storage
function getNameFromLocalStorage() {
    let name;
    if (localStorage.getItem('name') === null) {
        name = []
    } else {
        name = JSON.parse(localStorage.getItem('name'))
    }
    return name
}

function getName() {
    const name = getNameFromLocalStorage()
    name.forEach((name) => {
        createName(name)
    })
}

function addNameToLocalStorage(nameInputValue) {
    const name = getItemFromLocalStorage()
    name.push(nameInputValue)
    localStorage.setItem('name', JSON.stringify(name))
}

function createName(value){
    greetingTime(value)    
}
