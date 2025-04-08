// Select form and table body
const bookForm = document.getElementById('bookForm');
const bookTableBody = document.getElementById('bookTableBody');

// Add event listener for form submit
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

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
        window.location.href = "loginfile.html";
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