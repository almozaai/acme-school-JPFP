const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, School } = db.models;
const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', async(req,res,next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
});

app.get('/api/schools', async(req,res,next) => {
    School.findAll()
        .then(schools => res.send(schools))
        .catch(next);
});

db.syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listen on port ${port}`)))
    .catch(ex => console.log(ex))