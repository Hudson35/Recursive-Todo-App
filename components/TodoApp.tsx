import React, {useState, useEffect} from 'react'
import { TodoContextState } from "./TodoContext";
import MainTodoForm from "./MainTodoForm";
import TodoList from "./TodoList";
import TopAppBar from './TopAppBar';
import { ITodo } from "./TodoContext";
import localForage from "localforage";
import { Grid } from '@mui/material';

type Props = {}

const TodoApp = (props: Props): JSX.Element => {
    
    // Getting the todosArray from context state
    const [todosArray, setTodosArray] = TodoContextState();

    // This useEffect gets data from localForage upon page load/refresh
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             // Grab the values from localForage and set them in their local states
    //             const todosArrayLF: ITodo[] | null | undefined = await localForage.getItem('todosArray');
    //             setTodosArray(todosArrayLF);
    //         }
    //         catch(error) {
    //             console.log('Error occurred when getting localForage data', error);
    //         }
    //     })
    //     (); // Calling the above anonymous arrow function
    // }, []);

    // This useEffect sets data in localForage based on it's dependencies
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const todosArrayLF = await localForage.setItem('todosArray', todosArray);
    //         }         
    //         catch(error) {
    //             console.log('Error occurred when setting localForage data', error);
    //         }
    //     })
    //     (); // Calling the above anonymous arrow function

    // }, [todosArray, setTodosArray]);

    return (
        <>
            <TopAppBar />
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                
            >
                <Grid container item xs={12} lg={6} sx={{ marginTop: "3rem"}}>
                    <Grid item xs={12} sx={{height: '40px'}}>
                        <MainTodoForm />
                    </Grid>  
                    <Grid item xs={12} sx={{minHeight: '100vh'}}>
                        { 
                            todosArray?.length !== 0 && todosArray?.map((todoArrayItem: ITodo) => {
                                return <TodoList key={todoArrayItem.id} todoArrayItem={todoArrayItem} /> 
                            })
                        }
                    </Grid>
                </Grid>
            </Grid> 
        </>
    )
}

export default TodoApp; 
