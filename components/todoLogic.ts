import { ITodo } from "./TodoContext";

export function updateTodosArrayList(id: number, editTodo: string, array: ITodo[] | null | undefined) {
    array?.forEach((objEntry: ITodo) => {
      if(id === objEntry.id) {     // if the id's match then I have the correct Object
        objEntry.todoTask = editTodo;
      }
      // Goes deep inside the childrenTodos array to be able to make edits. Without this, it won't update any subTodo items past the first level
      updateTodosArrayList(id, editTodo, objEntry.childrenTodos);
    });
  }
  
export function deleteTodosArrayListItem(id: number, array: ITodo[] | null | undefined) {
    // Filters out the object I wanted to delete and returns a results array
    let filteredResult = array?.filter((objEntry: ITodo) => {
        return objEntry.id !== id;
    });

    let filteredResultCopy = filteredResult;
    
    // Need to go into the filteredResult array and check the childrensTodos arrays 
    filteredResult?.forEach((topLevelObjEntry: ITodo) => {
        let filteredResult2 = topLevelObjEntry.childrenTodos.filter((objEntry) => {
            return objEntry.id !== id;
        });
        
        topLevelObjEntry.childrenTodos = filteredResult2;

        // This goes deep inside the childrenTodos array to delete all the nested subTodos. 
        // Without this function call I can only delete the first sublevel but nothing further.
        return deleteTodosArrayListItem(id, topLevelObjEntry.childrenTodos);
    });

    // return the updated array
    return filteredResultCopy;
}
  
export function addSubTodoIntoTodosArray(id: number, newObj: ITodo, array: ITodo[] | null | undefined) {
    array?.forEach((objEntry) => {
        if (objEntry.id === id) {   // if the id's match, I found the correct object to perform insert
            objEntry.childrenTodos.push(newObj);    // push new object into childrenTodos array
        }
        // Goes deep inside the childrenTodos array so I can keep adding subTodos, without this I can only go one subtodo deep
        return addSubTodoIntoTodosArray(id, newObj, objEntry.childrenTodos);
    });
    return array;
}
  