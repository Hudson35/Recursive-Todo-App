import React, { useState, useEffect } from "react";

import { addSubTodoIntoTodosArray, deleteTodosArrayListItem, updateTodosArrayList } from "./todoLogic";
import { getSpecificObject, TodoContextState } from "./TodoContext";
import { ITodo } from "./TodoContext";

import { Button, Typography, Tooltip, TextField, IconButton, Collapse } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import localForage from "localforage";

interface IItem {
    todoArrayItem: {
        id: number
        todoTask: string 
        childrenTodos: ITodo[]
        subTodos?: ITodo[]
    }
}

function TodoList({ todoArrayItem }: IItem): JSX.Element {

    // LOCAL STATE
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showNewSubtaskForm, setShowNewSubtaskForm] = useState<boolean>(false);
    const [addSubTodo, setAddSubTodo] = useState<string>("");
    const [editTodo, setEditTodo] = useState<string>("");
    const [completedTask, setCompletedTask] = useState<boolean>(false);

    const [subTodos, setSubTodos] = useState(todoArrayItem.childrenTodos);

    // CONTEXT STATE
    let [todosArray, setTodosArray] = TodoContextState();

    // FUNCTIONS
    function handleTodoEdit(e: React.FormEvent<HTMLFormElement>, element: ITodo) {
        // Preventing the page from reloading
        e.preventDefault();

        // Updating the todosArray upon making an edit on a specific todo item
        updateTodosArrayList(element.id, editTodo, todosArray);

        setShowEditForm(false);

        setEditTodo("");

        console.log(todosArray);
    }

    function handleTodoDelete(element: ITodo) {
        let updatedArray = deleteTodosArrayListItem(element.id, todosArray);

        // setting the state for the latest updated todosArray
        setTodosArray(updatedArray);

        console.log(todosArray);
    }

    function handleAddingSubTodo(e: React.FormEvent<HTMLFormElement>, element: ITodo) {
        // Preventing the page from reloading
        e.preventDefault();
        
        let updatedArrayList = addSubTodoIntoTodosArray(element.id, getSpecificObject(addSubTodo), todosArray);
        
        setTodosArray(updatedArrayList);
        
        setShowNewSubtaskForm(false);
        
        setAddSubTodo("");
        
        console.log(todosArray);
    }

    const handleCompletedTaskChange = () => {
        setCompletedTask((prev) => !prev);
    }

    return (
        <div style={{ marginLeft: "20px" }}>          
            <div style={{ display: "flex", alignItems: "center", height: "40px", marginTop: '10px' }}>
                <div>
                    <div style={{float: 'left', display: 'inline-block', alignItems: 'center'}}>
                        {
                            showEditForm ? (
                                <div style={{display: 'inline-block', marginLeft: '10px'}}> 
                                    <form autoComplete="off" onSubmit={(e) => handleTodoEdit(e, todoArrayItem)}>
                                        <TextField
                                            label="Edit your todo"
                                            type="text"
                                            size="small"
                                            color="primary"
                                            variant="standard"
                                            placeholder={todoArrayItem.todoTask}
                                            value={editTodo}
                                            onChange={(e) => setEditTodo(e.target.value)}
                                            inputProps={{ maxLength: 70 }}
                                            sx={{ wordWrap: "break-word" }}
                                        />
                                        <Button
                                            type="submit" 
                                            variant="contained" 
                                            size="small" 
                                            color="primary"
                                            sx={{marginLeft: '5px', marginTop: '5px' }}
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </div>
                            )
                            :
                            (
                                <div style={{display: 'inline-block', marginLeft: '10px'}}>
                                    <Tooltip title="Toggle Completed" placement="left">
                                        <Typography 
                                            variant="h6" 
                                            onClick={handleCompletedTaskChange}
                                            sx={{textTransform: 'none', cursor: 'pointer', textDecoration: completedTask ? "line-through" : "none"}} 
                                        >
                                            {todoArrayItem.todoTask}
                                        </Typography>
                                    </Tooltip>
                                </div>
                            )
                        }
                        <Tooltip title="Add Subtodo">
                            <IconButton 
                                onClick={() => {
                                    setShowNewSubtaskForm((prev) => !prev);
                                }} 
                                size="small"
                                sx={{marginLeft: '5px', marginBottom: '5px'}}
                            >
                                <AddIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Todo">
                            <IconButton
                                onClick={() => {
                                    setShowEditForm((prev) => !prev);
                                }}
                                size="small"
                                sx={{marginLeft: '2px', marginBottom: '5px'}}
                            >
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Todo">
                            <IconButton 
                                onClick={() => handleTodoDelete(todoArrayItem)} 
                                size="small"
                                sx={{marginLeft: '2px', marginBottom: '5px'}}
                            >
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {
                showNewSubtaskForm && (
                    <form
                        autoComplete="off"
                        onSubmit={(e) => handleAddingSubTodo(e, todoArrayItem)}
                        style={{marginTop: '10px', marginLeft: '20px'}}
                    >
                        <TextField
                            type="text"
                            label="Enter a subtodo"
                            size="small"
                            color="primary"
                            variant="standard"
                            value={addSubTodo}
                            onChange={(e) => setAddSubTodo(e.target.value)}
                            inputProps={{ maxLength: 70 }}
                            sx={{ wordWrap: "break-word" }}
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="small" 
                            color="primary" 
                            sx={{marginLeft: '5px', marginTop: '5px' }}
                        >
                        ADD
                        </Button>
                    </form>
                )
            }
            {
                // This code below works good, doesn't have deep level data persistence, but has the top level
                todoArrayItem.childrenTodos.length !== 0 && todoArrayItem.childrenTodos.map((element: ITodo) => { return <TodoList key={element.id} todoArrayItem={element}/>; })
                
                // This code below doesn't work, was trying to implement deep level persistence 
                // subTodos[index]?.childrenTodos?.length !== 0 && subTodos[index]?.childrenTodos?.map((element: ITodo, index: number) => { return <TodoList key={element.id} todoArrayItem={element} index={index}/>; })
            }
        </div>
    );
}

export default TodoList;
