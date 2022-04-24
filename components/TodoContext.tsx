import React, { useContext, createContext, useState, ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export interface ITodo {
    id: number
    todoTask: string 
    childrenTodos: ITodo[]
}

// the todosArray can be undefined as well, so we need to add it here 
type ITodoContext = [ITodo[] | undefined | null, React.Dispatch<React.SetStateAction<ITodo[] | undefined | null>>];

// create the context
const TodoContext = createContext<ITodoContext>([[], () => null]);

function ListContext({children}: Props): JSX.Element {
    
    // As explained in the comment above at the top, the todosArray is not initialised, therefore it can be undefined
    const [todosArray, setTodosArray] = useState<ITodo[] | undefined | null>([
        {
            id: Date.now(),
            todoTask: "first todo", 
            childrenTodos: [],
        }
    ]);
    
    return (
        <TodoContext.Provider value={[todosArray, setTodosArray]}>
            {children}
        </TodoContext.Provider>
    )
}

export const getSpecificObject = (task: string) => {
    return {
        id: Date.now(),
        todoTask: task, 
        childrenTodos: [],
    }
}

export default ListContext;
export const TodoContextState = () => useContext(TodoContext);