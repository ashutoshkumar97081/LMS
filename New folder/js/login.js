// Toggle password visibility
document.getElementById('toggleLoginPassword') ? .addEventListener('click', function() {
    const passwordField = document.getElementById('loginPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});

document.getElementById('toggleSignupPassword') ? .addEventListener('click', function() {
    const passwordField = document.getElementById('signupPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});

// Signup logic
document.getElementById('signupForm') ? .addEventListener('submit', function(e) {
    e.preventDefault();

    const signupId = document.getElementById('signupId').value.trim();
    const signupPassword = document.getElementById('signupPassword').value.trim();
    const message = document.getElementById('signupMessage');

    if (!signupId || !signupPassword) {
        message.style.color = 'red';
        message.textContent = 'Please fill in all fields.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.id === signupId);

    if (userExists) {
        message.style.color = 'red';
        message.textContent = 'User already exists!';
        return;
    }

    users.push({ id: signupId, password: signupPassword });
    localStorage.setItem('users', JSON.stringify(users));

    message.style.color = 'green';
    message.textContent = 'Signup successful! Redirecting to login...';

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

// Login logic
document.getElementById('loginForm') ? .addEventListener('submit', function(e) {
    e.preventDefault();

    const loginId = document.getElementById('loginId').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();
    const message = document.getElementById('loginMessage');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.id === loginId);

    if (!user) {
        message.style.color = 'red';
        message.textContent = 'College Login ID incorrect!';
        return;
    }

    if (user.password !== loginPassword) {
        message.style.color = 'red';
        message.textContent = 'Password incorrect!';
        return;
    }

    message.style.color = 'green';
    message.textContent = 'Login successful! Redirecting...';

    setTimeout(() => {
        window.location.href = 'home.html'; // ✅ Replace with your home page
    }, 2000);
});