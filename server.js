const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//give express access to the public folder 
app.use(express.static('public'));


// Homepage route html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Notes route html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//get all notes

app.get('/api/notes', (req, res) => {
    res.json(data);
});

//get notes by id
app.get('/api/notes/:id', (req, res) => {
    res.json(data[Number(req.params.id)]);
});



//post new note
app.post('/api/notes', (req, res) => {
    let userNotes = req.body;
    let genId = (data.length).toString();
    console.log( `The new notes ID: ${genId}`);
    userNotes.id = genId;
    data.push(userNotes);

    fs.writeFileSync('./db/db.jason', JSON.stringify(data), err => {
        if (err) throw (err);
    });

    res.json(data);
});

// delete note 

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let newId = 0;
    console.log(`Note with ID: ${id} is being deleted`);
    data = data.filter(thisNote => {
        return thisNote.id != id;
    });

    for (thisNote of data) {
        thisNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
})

app.listen(PORT, () => 
console.log('App is listening')
);
