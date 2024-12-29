// A simple JavaScript game with login and registration functionality
const users = {}; // Store users as { username: password }

// HTML structure
const app = document.getElementById('app');
app.innerHTML = `
  <div id="login-form">
    <h2>Login</h2>
    <input type="text" id="login-username" placeholder="Username" />
    <input type="password" id="login-password" placeholder="Password" />
    <button onclick="login()">Login</button>
    <p>Don't have an account? <a href="#" onclick="showRegister()">Register here</a></p>
  </div>
  <div id="register-form" style="display: none;">
    <h2>Register</h2>
    <input type="text" id="register-username" placeholder="Username" />
    <input type="password" id="register-password" placeholder="Password" />
    <button onclick="register()">Register</button>
    <p>Already have an account? <a href="#" onclick="showLogin()">Login here</a></p>
  </div>
  <div id="game" style="display: none;">
    <h2>Welcome to the Game!</h2>
    <p>Click the button as many times as you can in 10 seconds!</p>
    <button id="game-button" onclick="incrementScore()">Click me!</button>
    <p>Score: <span id="score">0</span></p>
    <button onclick="startGame()">Start Game</button>
    <p><a href="#" onclick="logout()">Logout</a></p>
  </div>
`;

let currentUser = null;
let score = 0;
let gameInterval;

function showLogin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  if (users[username] && users[username] === password) {
    alert('Login successful!');
    currentUser = username;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('game').style.display = 'block';
  } else {
    alert('Invalid username or password!');
  }
}

function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (users[username]) {
    alert('Username already exists!');
  } else {
    users[username] = password;
    alert('Registration successful!');
    showLogin();
  }
}

function logout() {
  currentUser = null;
  score = 0;
  document.getElementById('score').textContent = score;
  document.getElementById('game').style.display = 'none';
  showLogin();
}

function startGame() {
  score = 0;
  document.getElementById('score').textContent = score;

  gameInterval = setTimeout(() => {
    alert(`Game over! Your score: ${score}`);
    clearTimeout(gameInterval);
  }, 10000);
}

function incrementScore() {
  score++;
  document.getElementById('score').textContent = score;
}
