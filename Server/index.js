const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors(
    {
        origin : ["https://todo-list-100-arulkar.vercel.app"],
        methods : ["POST","GET"],
        credentials : true
    }
))
app.use(express.json())

mongoose.connect('mongodb+srv://2005arulkar:aAjykYyYmh0bF3QU@cluster0.hbgzt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=> res.json(result))
    .catch(err => res.json(err)) 
})
app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done:  true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result=> res.json(result))
    .catch(err=> res.json(err))
})
app.listen(3001, () =>{
        console.log("Server is Running");
})
