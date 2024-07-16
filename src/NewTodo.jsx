import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import "./NewTodo.css"

export default function NewTodo() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let [todos, setTodos] = useState([{task: "SAMPLE TASK", id: Math.random(), isDone: false}])
    let [newVal, setNewVal] = useState("");

    function changeVal(e) {
        let value = e.target.value;
        let newValue = value.toUpperCase();
        setNewVal(newValue)
    }

    function addTask(e) {
        e.preventDefault();
        if(newVal != ""){
            setTodos((todos) => {
                return [...todos, {task: newVal, id: Math.random()}]
            })
        }else{
            alert("Enetr valid todo")
        }
        
        setNewVal("")
    }

    function deleteTodo(id){
        setTodos((todos) => {
            return todos.filter(todo => todo.id != id)
        })
    }

    // function upperCaseAll(){
    //     todos.map(todo => todo.task = todo.task.toUpperCase())
    //     setTodos([...todos])
    // }

    function updateOne(id){
        // setTodos((todos) => {
        //     return todos.map( todo => {
        //         if(todo.id == id){
        //             todo.task = todo.task.toUpperCase();
        //             return {...todo}
        //         }else{
        //             return todo
        //         }
        //     })
        // })

        let editedTodo = prompt("Edit ur task")
        setTodos((todos) => {
            return todos.map(todo => {
                if(editedTodo !== ""){
                    if(todo.id == id){
                        return {...todo, task: editedTodo.toUpperCase()}
                    }else{
                        return todo
                    }
                }else{
                    return todo
                }
            })
        })
    }    

    function handleCheck(id){
        setTodos(() => {
            return todos.map(todo => {
                if(id == todo.id){
                    todo.isDone = !todo.isDone;
                    return {...todo}
                }else{
                    return todo
                }
            })
        })
    }

    return (
        <div className="container">
            <h3>Todo</h3>
            <form  onSubmit={addTask}>
            <TextField id="outlined-basic" label="Enter todo" variant="outlined" size='small' value={newVal} onChange={changeVal} />
            <Button variant="contained" style={{ margin: "2px 0 0 10px" }} onClick={addTask}>Add</Button>
            </form>
            <ul>
                {todos.map((todo) => {
                    return <li className="todo" key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : null}>{todo.task}</span>
                        <IconButton aria-label="delete" onClick={() => deleteTodo(todo.id)} style={{marginLeft: "80px"}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => updateOne(todo.id)}  style={{marginRight: "30px"}}>
                            <EditIcon />
                        </IconButton>
                        <span>Mark as done <Checkbox {...label} onClick={() => handleCheck(todo.id)}/></span>
                    </li>
                })}
            </ul>
            
        </div>
    )
}