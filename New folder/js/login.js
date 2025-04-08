document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert("Please fill in both fields.");
        return;
    }

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();

        if (username === '' || password === '') {
            alert("Please fill in both fields.");
            return;
        }

        // Show success message
        document.getElementById('message').innerText = "Login Successful!";

        // Create a workbook with SheetJS
        var wb = XLSX.utils.book_new();
        var ws_data = [
            ["Username", "Password"],
            [username, password]
        ];
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "Credentials");

        // Write file and trigger download
        XLSX.writeFile(wb, "user_credentials.xlsx");
    });


    // Simulate login success for demonstration purposes
    document.getElementById('message').innerText = "Login Successful!";

    // Create CSV content with the username and password.
    // This CSV file can be opened in Excel.
    var csvContent = "data:text/csv;charset=utf-8,Username,Password\n" +
        username + "," + password;

    // Create a temporary download link and trigger the download.
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_credentials.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});