const express = require('express');
const app = express();
const port = 3000; // Choose desired port
const cors = require('cors'); // Import the cors package
const mysql = require('mysql2'); //added

//added
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'register',
});

// app.use(cors());
app.use(
    cors({
    //   origin: 'http://localhost:4200', // Replace with Angular app's URL
    // credentials: true,
    })
);

//added
database.connect((error)  => {
    if (error) {
        console.error('Error?' + error.stack);
        return;
    }
    console.log('Connect to database'+ database.threadId);
});

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});


app.get('', (req, res) => {
    database.query('SELECT * FROM regis',(err, results) => {
        if (err) {
            console.error('Error querying database: ' + err);
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.json(results);
    });
// sama
//         if (err) {throw err};
//         res.json(results);
//         console.log (results)

//     }); 

}); //added

// Middleware to parse JSON requests
// app.use(express.json());

// Define a registration endpoint

app.post('/register', (req, res) => {
    const { fullName, email, password, businessName, businessDescription } = req.body;

    const checkIfExistsQuery = 'SELECT COUNT(*) AS count FROM regis WHERE email = ?';
    database.query(checkIfExistsQuery, [email], (error, results) => {
        if (error) {
            console.error('Error checking existing user:', error);
            res.status(500).json({ message: 'Registration failed' });
            return;
        }

        const existingUserCount = results[0].count;

        if (existingUserCount > 0) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const insertQuery = 'INSERT INTO regis (fullName, email, password, businessName, businessDescription) VALUES (?, ?, ?, ?, ?)';
        database.query(insertQuery, [fullName, email, password, businessName, businessDescription], (err, result) => {
            if (err) {
                console.error('Error registering user: ' + err);
                res.status(500).json({ message: 'Registration failed' });
                return;
            }
            res.status(200).json({ message: 'Registration successful' });
        });
    });
});


// app.post('/register', (req, res) => {
//     const { fullName, email, password, businessName, businessDescription } = req.body;
    
//     // For simplicity, let's just log the registration data for now
//     console.log('Received registration data:', { fullName, email, password, businessName, businessDescription });
    
//     //Perform validation and then save to the database
//     const query = 'INSERT INTO regis (fullName, email, password, businessName, businessDescription) VALUES (?, ?, ?, ?, ?)';
//     database.query(query, [fullName, email, password, businessName, businessDescription], (err, result) => {
//         if (err) {
//             console.error('Error registering user: ' + err);
//             res.status(500).json({ message: 'Registration failed' });
//             return;
//         }
//         res.status(200).json({ message: 'Registration successful' });
//     });
//     // Here you'd typically save the user to a database
    
//     res.status(200).json({ message: 'Registration successful' });
// });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    //  authentication logic here
    const query = 'SELECT * FROM regis WHERE email = ? AND password = ?';
    database.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user: ' + err);
            res.status(500).json({ message: 'Authentication failed' });
            return;
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    });
});


// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
    
//     //  authentication logic here
//     if (username === 'sallu@gmail.com' && password === 'sallu123') {
//         res.status(200).json({ message: 'Login successful' });
//     } else {
//         res.status(401).json({ message: 'Incorrect username or password' });
//     }
// });

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
