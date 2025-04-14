// Select form and table body
const bookForm = document.getElementById('bookForm');
const bookTableBody = document.getElementById('bookTableBody');

// Add event listener for form submit
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const books = [
        { title: 'Software Engineering' },
        { title: 'Database System Concepts (DBMS)' },
        { title: 'C++ Program Desing' },
        { title: 'Data Communications and Networking (CN)' },
        { title: 'Data Structures' },
        // ... etc
    ];

    // Get form values
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = document.getElementById('year').value.trim();

    if (title && author && year) {
        addBook(title, author, year);

        // Reset the form
        bookForm.reset();
    }
});

// Function to add book to the table
function addBook(title, author, year) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td><button onclick="deleteBook(this)">Delete</button></td>
    `;

    bookTableBody.appendChild(row);
}

// Function to delete a book row
function deleteBook(button) {
    button.closest('tr').remove();
}
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    if (!/^[\w.+\-]+@gmail\.com$/.test(email)) {
        alert('Please enter a valid Gmail address.');
        return;
    }

    if (address.length < 5) {
        alert('Please enter a valid address.');
        return;
    }

    document.getElementById('confirmationMessage').innerText = 'Thank you! Your details have been submitted.';

    // Optional: Clear form after submission
    this.reset();
});

function goToBooks() {
    document.body.innerHTML += `<div class="loader"></div>`;
    setTimeout(() => {
        window.location.href = "./loginfile.html";
    }, 1500);
}
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Form reload ko roke
    // Yahan aap future me data save kar sakte ho CSV ya localStorage me
    window.location.href = "success.html"; // Redirect kare success page par
});
const getStartedBtn = document.getElementById('getStartedBtn');

getStartedBtn.addEventListener('click', () => {
    // Add loader
    document.body.innerHTML += `<div class="loader"></div>`;

    // Redirect after delay
    setTimeout(() => {
        window.location.href = "getstartnow.html";
    }, 1500);
});

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            window.location.href = `books.html?search=${encodeURIComponent(query)}`;
        }
    }
}
// Get search term from URL
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';

function searchBooks() {
    let input = document.getElementById("searchInput").value.trim().toLowerCase();

    if (input !== "") {
        // Save search query to localStorage
        localStorage.setItem('searchQuery', input);

        // Add loader effect
        document.body.innerHTML += `<div class="loader"></div>`;
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        alert("Please enter a book name to search!");
    }
}


// Sample book data
const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Clean Code', author: 'Robert C. Martin' },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' }
];

// Render books function
function renderBooks(bookArray) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (bookArray.length === 0) {
        bookList.innerHTML = '<li class="no-results">No results found</li>';
        return;
    }

    bookArray.forEach(book => {
        const li = document.createElement('li');
        let bookTitle = book.title;
        let bookAuthor = book.author || '';

        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            bookTitle = bookTitle.replace(regex, '<span class="highlight">$1</span>');
            bookAuthor = bookAuthor.replace(regex, '<span class="highlight">$1</span>');
        }

        li.innerHTML = `${bookTitle} <br><small>by ${bookAuthor}</small>`;
        bookList.appendChild(li);
    });

    // Auto-scroll to the first highlight
    const firstHighlight = document.querySelector('.highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initial render
renderBooks(books);

searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
});
// Signup logic (Updated with Security Question & Answer)
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const signupId = document.getElementById('signupId').value.trim();
    const signupPassword = document.getElementById('signupPassword').value.trim();
    const signupQuestion = document.getElementById('signupQuestion').value.trim();
    const signupAnswer = document.getElementById('signupAnswer').value.trim();
    const message = document.getElementById('signupMessage');

    if (!signupId || !signupPassword || !signupQuestion || !signupAnswer) {
        message.style.color = 'red';
        showToast('Your message here', 'success'); // for success
        showToast('Your error message', 'error'); // for error
        'Please fill in all fields.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.id === signupId);

    if (userExists) {
        message.style.color = 'red';
        showToast('Your message here', 'success'); // for success
        showToast('Your error message', 'error'); // for error
        'User already exists!';
        return;
    }

    users.push({
        id: signupId,
        password: signupPassword,
        question: signupQuestion,
        answer: signupAnswer
    });

    localStorage.setItem('users', JSON.stringify(users));

    message.style.color = 'green';
    showToast('Your message here', 'success'); // for success
    showToast('Your error message', 'error'); // for error
    'Signup successful! Redirecting to login...';

    setTimeout(() => {
        showPage('login');
    }, 2000);
});
// Forgot Password Logic (with Security Question)
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('forgotId').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const message = document.getElementById('forgotMessage');
    const user = users.find(user => user.id === id);
    const securitySection = document.getElementById('securitySection');

    // Step 1: If security section is hidden, show the question
    if (securitySection.style.display === 'none') {
        if (!user) {
            showToast('Your message here', 'success'); // for success
            showToast('Your error message', 'error'); // for error
            'User not found!';
            message.className = 'message error';
            return;
        }

        // Show security question
        document.getElementById('securityQuestion').textContent = `Security Question: ${user.question}`;
        securitySection.style.display = 'block';
        showToast('Your message here', 'success'); // for success
        showToast('Your error message', 'error'); // for error
        'Please answer your security question.';
        message.className = 'message';
        return;
    }

    // Step 2: Check security answer
    const answer = document.getElementById('forgotAnswer').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();

    if (user.answer !== answer) {
        showToast('Your message here', 'success'); // for success
        showToast('Your error message', 'error'); // for error
        'Security answer incorrect!';
        message.className = 'message error';
        return;
    }

    // Step 3: Reset password
    user.password = newPass;
    localStorage.setItem('users', JSON.stringify(users));

    showToast('Your message here', 'success'); // for success
    showToast('Your error message', 'error'); // for error
    'Password reset successful!';
    message.className = 'message success';

    setTimeout(() => {
        showPage('login');
    }, 2000);
});

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
document.getElementById('toggleSignupPassword').addEventListener('click', function() {
    const passwordField = document.getElementById('signupPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});
const signupPassword = document.getElementById('signupPassword');
const strengthText = document.getElementById('passwordStrength');

if (signupPassword && strengthText) {
    signupPassword.addEventListener('input', function() {
        const val = signupPassword.value;
        let strength = 'Weak';
        let color = 'red';

        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const mediumRegex = /^((?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d))(?=.{6,})/;

        if (strongRegex.test(val)) {
            strength = 'Strong';
            color = 'green';
        } else if (mediumRegex.test(val)) {
            strength = 'Medium';
            color = 'orange';
        }

        strengthText.textContent = strength;
        strengthText.style.color = color;
    });
} else {
    console.warn('Password input or strength text element not found.');
}
setTimeout(() => {
    window.location.href = './loginfile.html?signup=success';
}, 2000);
if (urlParams.get('signup') === 'success') {
    const loginMessage = document.getElementById('loginMessage');
    if (loginMessage) {
        loginMessage.textContent = 'Your signup was successful! Please login.';
        loginMessage.style.color = 'green';
    }
}
let users = JSON.parse(localStorage.getItem('users')) || [];

users.push({
    id: signupId,
    password: signupPassword,
    question: signupQuestion,
    answer: signupAnswer
});

localStorage.setItem('users', JSON.stringify(users));
document.getElementById('loginForm').addEventListener('submit', function(e) {
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

    // Store current session user
    sessionStorage.setItem('currentUser', user.id);

    setTimeout(() => {
        window.location.href = './dashboard.html'; // Redirect to your dashboard
    }, 2000);
});
const currentUser = sessionStorage.getItem('currentUser');
if (currentUser) {
    document.getElementById('welcomeUser').textContent = `Hello, ${currentUser}!`;
} else {
    window.location.href = './loginfile.html'; // If not logged in, go to login
}
// Open or create IndexedDB database
let db;
const request = indexedDB.open('LibraryUserDB', 1);

// Create object store (table) if it doesn't exist
request.onupgradeneeded = function(event) {
    db = event.target.result;
    const userStore = db.createObjectStore('users', { keyPath: 'id' });
    userStore.createIndex('password', 'password', { unique: false });
    userStore.createIndex('question', 'question', { unique: false });
    userStore.createIndex('answer', 'answer', { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function() {
    console.error('Database error:', request.error);
};

// Save user data in IndexedDB
function saveUserToDB(userData) {
    const transaction = db.transaction(['users'], 'readwrite');
    const userStore = transaction.objectStore('users');
    const request = userStore.add(userData);

    request.onsuccess = function() {
        alert('Signup successful! Redirecting to login...');
        window.location.href = './loginfile.html?signup=success';
    };

    request.onerror = function() {
        alert('User already exists!');
    };
}
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const signupId = document.getElementById('signupId').value.trim();
    const signupPassword = document.getElementById('signupPassword').value.trim();
    const signupQuestion = document.getElementById('signupQuestion').value.trim();
    const signupAnswer = document.getElementById('signupAnswer').value.trim();

    if (!signupId || !signupPassword || !signupQuestion || !signupAnswer) {
        alert('Please fill in all fields.');
        return;
    }

    const newUser = {
        id: signupId,
        password: signupPassword,
        question: signupQuestion,
        answer: signupAnswer
    };

    saveUserToDB(newUser);
});