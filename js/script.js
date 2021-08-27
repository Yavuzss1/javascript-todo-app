const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');

const yan = document.querySelector(".yan");


let todos = [];


//kullanıcı input a yeni bir yapılacaklar yazarsa onu alıp yukarıda 
//benzer bir nesne oluşturup onu todos dizisine gönderir
todoForm.addEventListener('submit', function(event) {

    event.preventDefault();
    addTodo(todoInput.value);
});
yan.addEventListener('click', function(event) {

    event.preventDefault();
    addTodo(yan.value);
});

//fonksiyonlar 
function addTodo(item) { //ögenin boş olup olmadığını kontrol eder 

    if (item !== '') { //eğer boş değilse

        const todo = { //todo yeni bir nesne oluşturur 
            id: Date.now(),
            name: item,
            completed: false
        };


        todos.push(todo);
        addToLocalStorage(todos);


        todoInput.value = '';
    }
}

function renderTodos(todos) {

    todoItemsList.innerHTML = '';


    todos.forEach(function(item) {

        const checked = item.completed ? 'checked' : null;


        const li = document.createElement('li');

        li.setAttribute('class', 'item');

        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
      <button class="choose-button">+</button>
      
    `;

        todoItemsList.append(li);
    });

}


function addToLocalStorage(todos) {

    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}


function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference) {

        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}


function toggle(id) {
    todos.forEach(function(item) {

        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {


    if (event.target.classList.contains('choose-button')) {

        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {

        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }


});