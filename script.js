// Store valid credentials in localStorage (for demonstration purposes)
if (!localStorage.getItem('validCredentials')) {
    localStorage.setItem('validCredentials', JSON.stringify({ username: 'u', password: 'p' }));
}

// Retrieve valid credentials from localStorage
const validCredentials = JSON.parse(localStorage.getItem('validCredentials'));

// Check if the user is logged in
function checkAuth() {
    const isLoggedIn = document.cookie.split('; ').find(row => row.startsWith('loggedIn='));
    if (!isLoggedIn || isLoggedIn.split('=')[1] !== 'true') {
        window.location.href = 'index.html';
    } else {
        loadTodoList(); // Load the To-Do list if the user is logged in
    }
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validCredentials.username && password === validCredentials.password) {
        document.cookie = "loggedIn=true; path=/; max-age=3600"; // 1 hour
        console.log("Login successful, redirecting...");
        window.location.href = 'home.html';
    } else {
        document.getElementById('message').innerText = "Invalid username or password.";
    }
});

// Handle logout button click
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'index.html';
});

// Load the To-Do list from localStorage
function loadTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = ''; // Clear the list before loading

    todoList.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        todoListElement.appendChild(li);
    });
}

// Add a new task to the To-Do list
document.getElementById('addTodoBtn')?.addEventListener('click', function() {
    const todoInput = document.getElementById('todoInput');
    const task = todoInput.value.trim();

    if (task) {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        todoList.push(task);
        localStorage.setItem('todoList', JSON.stringify(todoList));

        // Reload the To-Do list
        loadTodoList();
        todoInput.value = ''; // Clear the input field
    }
});

// Check authentication status on page load
checkAuth();