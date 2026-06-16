import express from "express";
import { createTodo , getalltodo,updatetodo,deletetodo} from '../controllers/todo.controller.js';
const route=express.Router();

route.get('/',(req,res)=>{
    res.send("ToDO app is Running")
})

//create todo
route.post('/add',createTodo);

//get all todo
route.get('/all',getalltodo)


//Upadate todo
route.put('/update/:id',updatetodo)

//delete
route.delete('/delete/:id',deletetodo)


export default route;