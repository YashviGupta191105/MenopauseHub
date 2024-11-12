const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure the 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl: imageUrl });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
/*
Replace 'http://your-server-url/upload' with your actual server URL.
    Adjust the file path and storage settings for Vultr or any other hosting platform you are using.
    Ensure the uploads directory exists and has write permissions on your server.*/


/*
for mood selection part*/

const bodyParser = require('body-parser');
const fs = require('fs');





// Middleware
app.use(bodyParser.json());

// Route to handle mood submission
app.post('/submit-mood', (req, res) => {
    const mood = req.body.mood;

    if (mood) {
        // Save the mood data to a file (e.g., moods.json)
        const moodsFilePath = path.join(__dirname, 'moods.json');
        const moodData = {
            mood: mood,
            timestamp: new Date().toISOString()
        };

        // Append mood to moods.json
        fs.readFile(moodsFilePath, 'utf8', (err, data) => {
            const moods = data ? JSON.parse(data) : [];
            moods.push(moodData);

            fs.writeFile(moodsFilePath, JSON.stringify(moods, null, 2), (err) => {
                if (err) {
                    console.error("Error saving mood data:", err);
                    return res.status(500).json({ error: 'Failed to save mood data' });
                }
                res.status(200).json({ message: 'Mood submitted successfully' });
            });
        });
    } else {
        res.status(400).json({ error: 'No mood provided' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Create a connection to the Vultr MySQL database
const db = mysql.createConnection({
    host: 'vultr-prod-40a1ee94-eb56-446c-9b9c-2a9070d51f30-vultr-prod-9e9b.vultrdb.com', // Replace with your Vultr database IP address
    user: 'vultradmin',         // Replace with your database username
    password: 'AVNS_GQW4P-aZuhICTqYJTu5',     // Replace with your database password
    database: 'defaultdb'          // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

// Example route to test database connection
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.send(`Database connection is successful. Result: ${results[0].result}`);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});