const table = document.querySelector('#todo-table');
const tableBody = document.querySelector('#todo-tb');
const form = document.querySelector('#todoAddForm');
const todoItem = document.querySelector('#todoItem');
const clearBtn = document.querySelector('#clearBtn');
var todoItemsCount = localStorage.length;

var localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function WriteToLocalStorage(record) {
    localStorage.setItem(++todoItemsCount, record)
}

function ReadFromLocalStorage(i) {
    return localStorage.getItem(i);
}

function ClearLocalStorage() {
    localStorage.clear();
}

function createNewTableRow(todo) {
    var newRow = tableBody.insertRow();
    var newCell = newRow.insertCell();
    var todo = document.createTextNode(todo);
    newCell.appendChild(todo);

}

function LoadTableData() {
    if (todoItemsCount == 0) {
        createNewTableRow('No todos found!');
    }
    else {
        tableBody.innerHTML = '';
        console.log('Number of todos', todoItemsCount)
        for (let index = 1; index <= todoItemsCount; index++) {
            console.log(index);
            console.log('Reading data : ', ReadFromLocalStorage(index));
            if (ReadFromLocalStorage(index) != null) {
                createNewTableRow(ReadFromLocalStorage(index));
            }
        }
    }

}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (todoItem.value == '') {
        todoItem.className += ' text-danger'
        return;
    }
    WriteToLocalStorage(todoItem.value);

    console.log(ReadFromLocalStorage(todoItemsCount));

    document.querySelector('#todoAddForm').reset();

    LoadTableData();
})

window.addEventListener('load', (event) => {
    todoItemsCount = localStorage.length;
    console.log(todoItemsCount);
    LoadTableData();
    console.log('page is fully loaded');
});

clearBtn.addEventListener('click', (event) => {
    localStorage.clear();
    console.log("Local storage length : " + todoItemsCount);
    tableBody.innerHTML = ''

    createNewTableRow('No todos found!');

})