const table = document.querySelector('#todo-table');
const tableBody = document.querySelector('#todo-tb');
const form = document.querySelector('#todoAddForm');
const todoItem = document.querySelector('#todoItem');
const clearBtn = document.querySelector('#clearBtn');
var todoItemsCount = 0;


function createNewTableRow(todo) {
    var newRow = tableBody.insertRow();
    var newCell = newRow.insertCell();
    var todo = document.createTextNode(todo);
    newCell.appendChild(todo);

}

function LoadTableData() {

    fetch('http://localhost:3000/admin/todos')
    .then(response=>response.json())
    .then(data => {
        console.log(data)
        if(data.length==0)
        {
            createNewTableRow('No todos found!');
        }
        else{
            todoItemsCount=data.length;
            tableBody.innerHTML = '';
            console.log('Number of todos', data.length)
            for (let index = 0; index < todoItemsCount; index++) {
                createNewTableRow(data[index].todo);
            }
        }

    })
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (todoItem.value == '') {
        todoItem.className += ' text-danger'
        return;
    }
    var data = {todoItem : todoItem.value}

    if(todoItem.value!=''){
        tableBody.innerHTML = '';

    }
    fetch(
        'http://localhost:3000/admin',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          todoItemsCount=data.length;
            console.log('Number of todos', todoItemsCount)

            for (let index = 0; index < todoItemsCount; index++) {
                createNewTableRow(data[index].todo);
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
})

window.addEventListener('load', (event) => {
    LoadTableData();
    console.log('page is fully loaded');
});
