import React, { useState } from "react";
import { Button, TextField, IconButton, Tooltip } from "@mui/material";
import { TodoContextState } from "./TodoContext";
import ClearIcon from '@mui/icons-material/Clear';

interface Props {

}

function MainForm({}: Props): JSX.Element {

    // LOCAL STATE
    const [todoValue, setTodoValue] = useState<string>("");

    // CONTEXT STATE
    let [todosArray, setTodosArray] = TodoContextState();

    // FUNCTIONS
    const handleTodoValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value);
        // setTodoValue(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        e.preventDefault();

        // Updating the todosArray  
        setTodosArray((prevState: any) => [
            ...prevState, 
            {
                id: Date.now(),
                todoTask: todoValue, 
                childrenTodos: [],
            }
        ]);

        // reset the input field value back to blank
        setTodoValue("");
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" style={{width: '100%'}}>
            <div style={{width: '95%', margin: '0 auto'}}>
                <TextField 
                    type="text" 
                    label="Enter a todo" 
                    size="small" 
                    required 
                    value={todoValue} 
                    onChange={handleTodoValueChange}
                    inputProps={{ maxLength: 70 }}
                    sx={{width: '85%', wordWrap: "break-word"}} 
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
                <Tooltip title="Clear All Todos" placement="right">
                    <IconButton 
                        size="small" 
                        sx={{marginLeft: '5px', marginTop: '5px', }}
                        onClick={() => {
                            setTodosArray([]);
                        }}  
                    >
                        <ClearIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </div>
        </form>
    );
}

export default MainForm;
