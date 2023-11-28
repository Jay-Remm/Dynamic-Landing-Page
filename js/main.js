import { handleLocationSubmit } from "./weather.js";

// DOM Elements | by placing a comma we dont have to type const every time
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    fName = document.getElementById('name'),
    focus = document.getElementById('focus');

// AM PM Option
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    // Using a turnary operator (which is the question mark)
    const amPM = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPM : ''}`;

    setTimeout(showTime, 1000);
}

// Add Zeros to the time elements when they role over to single digits
//adding the "addZero" function into the output time section above
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    // the document.body.style.attribute pushes css into the page based on the paramerters we give it.
    if(hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('../media/morning.jpg')";
        document.body.style.backgroundSize = "cover";
        //background position bottom is a good alternitive to bring the trees up.
        document.body.style.backgroundPosition = "center";
        greeting.textContent = 'Good Morning';
        document.body.style.color = "black";
        document.body.style.textShadow = "-2px 0px white, 0px -2px white, 2px 0px white, 0px 2px white, -2px -2px white, -2px 2px white, 2px -2px white, 2px 2px white";
    } else if(hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('../media/afternoon.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        greeting.textContent = 'Good Afternoon';
        document.body.style.color = "white";
        // Adding a text-shadow to essentually border the white text so it stands out
        document.body.style.textShadow = "-2px 0px black, 0px -2px black, 2px 0px black, 0px 2px black, -2px -2px black, -2px 2px black, 2px -2px black, 2px 2px black";
    } else {
        // Evening
        document.body.style.backgroundImage = "url('../media/night.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "bottom";
        greeting.textContent = 'Good Evening';
        document.body.style.color = "white";
        document.body.style.textShadow = "-2px 0px black, 0px -2px black, 2px 0px black, 0px 2px black, -2px -2px black, -2px 2px black, 2px -2px black, 2px 2px black";

    }

    // making sure the greeting and background are checked on the minute (changed from hour [* 60] because if the page is first accessed in the last minute of the hour, i have to wait 60 minutes for the change) so that it actually turns over to the new greeting and image on the marked time without refresh
    setTimeout(setBgGreet, 1000 * 60)
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        fName.textContent = '[Enter Name]';
    } else {
        fName.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if(e.type === 'keypress') {
        // Make sure enter is pressed (the enter key is 13 identifier)
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            // Keeps the enter key from moving to a new text line
            fName.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if(e.type === 'keypress') {
        // Make sure enter in pressed (the enter key is 13 identifier)
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            // Keeps the enter key from moving to a new text line
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

fName.addEventListener('keypress', setName);
fName.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//toggles for the weather widget and the todo widget
const weatherWidget = document.querySelector('.weatherwidget')
const weatherFull = document.querySelector('.weather-full')
const todoWidget = document.querySelector('.todowidget')
const todoFull = document.querySelector('.todo-full')

weatherWidget.addEventListener('click', () => {
    if (weatherFull.classList.contains('x')) {
        weatherFull.classList.remove('x')
    } else {
        weatherFull.classList.add('active')
        weatherFull.focus()
    }
})

// the blur event was not working to remove the weatherFull div until i found that this issue was the weatherWidget div was considered as not 'keyboeard-focusable'. the easy fix to making it focusable and in turn making my blur call work was adding the tabindex="0" attribute onto the html div for my weatherWidget
weatherFull.addEventListener('blur', () => {
    weatherFull.classList.remove('active')
    weatherFull.classList.add('x')
    setTimeout(() => {
        weatherFull.classList.remove('x')
    }, 500)
})

todoWidget.addEventListener('click', () => {
    todoFull.classList.toggle('active')
    keepTodoFull()
})

function getTodoFull() {
    if (localStorage.getItem('Show Todo Widget') === 'true') {
        todoFull.classList.add('active')
    }
}

function keepTodoFull() {
    if (todoFull.classList.contains('active')) {
        localStorage.setItem('Show Todo Widget', true)
    } else {
        localStorage.setItem('Show Todo Widget', false)
    }
}

//Building the todo widget
const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoUL = document.getElementById('todos')

// checking to see of items are in local storage
const todos = JSON.parse(localStorage.getItem('todos'))

function getTodos() {
    if (todos) {
        todos.forEach(todo => addTodo(todo))

    }
    localStorage.setItem('todos', JSON.stringify(todos))
}

// adding todo items from the form to the UL
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = todoInput.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        // listing for a click to toggle the li as complete
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        // listening for a right click to delete todo li
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        })

        todoUL.appendChild(todoEl)

        //clears the input box for another submition
        todoInput.value = ''

        updateLS()
    }
}

// the following is to save the todo inputs to local storage
function updateLS() {
    let todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

// Run weather API and plug data into widget

// Setting the user inputed city and getting the most recent data from local storage on what city we are using
const city = document.getElementById('city')

// Get City
function getCity() {
    if (localStorage.getItem('city') === '') {
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
        handleLocationSubmit()
    }
}

// Set City
function setCity(e) {
    if(e.type === 'keypress') {
        // Make sure enter is pressed (the enter key is 13 identifier)
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            // Keeps the enter key from moving to a new text line
            city.blur();
        }
    } else {
        localStorage.setItem('city', e.target.innerText);
    }
}

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('focus', () => {
    if (city.textContent === '[Enter City]') {
        // highlight the text content when focused
        // This might not be possible in simple code unless i switch the city span to an input in the html
    }
})

// Handling my imported script from weather.js
city.addEventListener('change', (e) => setLocation(e.target.value))
city.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleLocationSubmit()
        weatherFull.focus()
    }
})



// Run 
showTime();
setBgGreet();
getName();
getFocus();
getTodos();
getTodoFull();
getCity();