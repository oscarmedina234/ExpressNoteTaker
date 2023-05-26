const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

//get all notes
app.get('/api/notes', (req, res) => res.json(db));

// Homepage route
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Notes route
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//post new note
app.post('/api/notes', (req, res) => {
    let newNotes = req.body;
    let uniqueId = (data.lenght).toString();
    console.log(uniqueId);
    data.push(newNotes);
})

app.listen(PORT, () => 
console.log('App is listening')
);
