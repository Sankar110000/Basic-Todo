import { useState } from "react"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function Todo() {
    let [todos, setTodos] = useState([{task: "sample-task", id: Math.random()}])
    let [newVal, setNewVal] = useState('')

    function changeNewVal(e){
        setNewVal(e.target.value)
    }

    function addTask(){
        setTodos((todos) => {
            return [...todos, {task: newVal, id: Math.random()}]
        })
        setNewVal("")
    }

    function deleteOne(id){
        let arr = todos.filter((todo) => todo.id != id);
        setTodos((currVal) => {
            return currVal.filter((todo) => todo.id != id)
        })
    }

    function updateOne(id){
        setTodos((todos) => {
            return todos.map((todo) => {
                if(todo.id == id){
                    todo.task = todo.task.toUpperCase()
                    return {...todo}
                }else{
                    return todo
                }
            })
        })
    }

    function updateAll(){
        setTodos((todos) => {
            return todos.map(todo => {
                todo.task = todo.task.toUpperCase()
                return {...todo}
            })
        })
    }

    

    return (
        <>
            <h3>Enter your tasks</h3>
            <TextField id="outlined-basic" label="Enter your task" variant="outlined"  value={newVal} onChange={changeNewVal} size="small"/>
            <Button onClick = {addTask} variant="contained">Add task</Button>
            <ul>
                {todos.map(todo => 
                <li key={Math.random()*10}>{todo.task} 
                <Button onClick={() => deleteOne(todo.id)} variant="contained">Delete</Button>
                <Button onClick={() => updateOne(todo.id)} variant="contained">Uppercase</Button>
                </li>
                )}
            </ul>
            <Button onClick={updateAll} variant="contained">Update All</Button>
        </>
    )
}