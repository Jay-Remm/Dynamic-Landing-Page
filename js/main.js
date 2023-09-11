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

    // making sure the greeting and background are checked on the hour so that it actually turns over to the new greeting and image on the marked time without refresh
    setTimeout(setBgGreet, 1000 * 60 * 60)
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

// Run 
showTime();
setBgGreet();
getName();
getFocus();