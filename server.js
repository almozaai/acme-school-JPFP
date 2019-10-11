const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, School } = db.models;
const port = process.env.PORT || 5000;

app.use(express.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', async(req,res,next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
});

app.get('/api/schools', (req,res,next) => {
    School.findAll({include: [Student]})
        .then(schools => res.send(schools))
        .catch(next);
});

app.post('/api/students/', (req, res, next) => {
    Student.create(req.body)
        .then(student => res.status(201).send(student))
        .catch(next)
})

app.delete('/api/students/:id', (req, res, next) => {
    Student.findByPk(req.params.id)
        .then(student => student.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
})

app.put('/api/students/:id', async (req,res,next) =>{
    try{
        const instance = await Student.findByPk(req.params.id);
        Object.assign(instance, req.body);
        await instance.save();
        res.send(instance)
    }
    catch(ex) { next(ex) }
    
        
})

db.syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listen on port ${port}`)))
    .catch(ex => console.log(ex))