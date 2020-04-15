'use strict';


const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),  //невыполненные дела
todoCompleted = document.querySelector('.todo-completed'); //выполненные дела

//массив для хранения дел
const todoData = [
    //localStorage.getItem('array')
];

//создаем верстку для добавленных дел
const render = function() {
//перед добавлением надо очищать от предыдущих дел, чтобы весь список заново не добавлялся, прописываем пустые строки
    todoList.textContent = '';
    todoCompleted.textContent = '';

todoData.forEach(function(item) {

    const li = document.createElement('li');
    li.classList.add('todo-item');   //добавляем ему класс .todo-item
//пишем верстку
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
      '</div>';
//Проверяем флаг completed
if(item.completed) {
    todoCompleted.append(li);
} else {
    todoList.append(li); //добавляем это все на страницу в наш toDoList
}

localStorage.setItem('array', JSON.stringify(todoData));

//Добавления completed item в раздел сделанных дел
const btnTodoCompleted = li.querySelector('.todo-complete');
btnTodoCompleted.addEventListener('click', function() {
    item.completed = !item.completed;
    render();
    });
 
//Удаление дела
const todoRemove = li.querySelector('.todo-remove');
todoRemove.addEventListener('click', function() {
    todoData.splice (todoData.indexOf(item), 1);
   localStorage.removeItem('array');
    render();
    });
  });
};

//добавление новых дел
todoControl.addEventListener('submit', function(event) {
event.preventDefault();

const newToDo =  {
    value: headerInput.value,
    completed: false            //флаг для незавершенных дел
    };
if(headerInput.value !== '') {
todoData.push(newToDo);
 }

 headerInput.value = '';

render();
});

render();