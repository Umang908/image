const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

// Middleware to serve static files
app.use(express.static('public'));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Serve index.html for home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
