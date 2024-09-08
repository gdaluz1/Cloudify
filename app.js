const express = require('express');
const path = require('path'); // Import the path module correctly
const app = express();
const port = 3030;

// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Route for portfolio
app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/portfolio.html')); // Correctly serve portfolio.html
});

// Redirect route to handle OAuth response
app.get('/auth/redirect', (req, res) => {
    // Handle OAuth response here
    const authCode = req.query.code;
    console.log("Auth Code received:", authCode);
    // Use MSAL or other libraries to exchange the authCode for an access token
    res.redirect('/dashboard');
});

// Dashboard route (only accessible after authentication)
app.get('/dashboard', (req, res) => {
    res.send("Welcome to your dashboard! You are signed in.");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});