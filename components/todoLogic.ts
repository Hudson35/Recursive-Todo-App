import { ITodo } from "./TodoContext";

/* Function Description:
    This function handles the editing operation (updating) of a todo when the user hits
    the edit button. It loops over the todosArray until it finds the correct object id and then updates
    the new edited value on the correct object. 
*/
export function updateTodosArrayList(id: number, editTodo: string, array: ITodo[] | null | undefined) {
    array?.forEach((objEntry: ITodo) => {
      if(id === objEntry.id) {     // if the id's match then I have the correct Object
        objEntry.todoTask = editTodo;
      }
      // Starts at the top of the todosArray (that was passed in) and makes it's way down until the id's match and then performs the edit operation
      updateTodosArrayList(id, editTodo, objEntry.childrenTodos);
    });
}
  
/* Function Description:
    This function handles deleting a todo. It loops over the todosArray and returns the 
    elements of an array that meet the condition: objEntry.id !== id;
    It then does the same exact thing as above (the filtering) but on the childrenTodos array
    of each top level object.
    It repeats this process until the correct todo has been deleted from the todosArray.
*/
export function deleteTodosArrayListItem(id: number, array: ITodo[] | null | undefined) {
    // Starts from the top level of the array and filters out based on objEntry.id !== id 
    // and then returns a filtered results array
    let filteredResult = array?.filter((objEntry: ITodo) => {
        return objEntry.id !== id;
    });

    let filteredResultCopy = filteredResult;
    
    // Need to loop over the filteredResult array and then go into the childrensTodos arrays
    // and filter over the childrenTodos based on objEntry !== id 
    filteredResult?.forEach((topLevelObjEntry: ITodo, index: number) => {
        let filteredResult2 = topLevelObjEntry.childrenTodos.filter((objEntry) => {
            return objEntry.id !== id;
        });
        // printing out the filteredResults2
        console.log('filteredResult2', filteredResult2)
        // set the results of the above step on topLevelObjEntry.childrenTodos
        topLevelObjEntry.childrenTodos = filteredResult2;

        // This calls it again to repeat the process going one level deeper until the requirements are 
        // satisfied. Without this function call I can only delete the first sublevel but nothing further. No nested subTodos could be deleted. 
        console.log('Index', index) // this console log is for testing purposes.
        return deleteTodosArrayListItem(id, topLevelObjEntry.childrenTodos);
    });

    // return the updated array
    return filteredResultCopy;
}

/* Function Description:
    This function handles adding a new subtodo into the todosArray. It loops over the todosArray
    until it finds the correct object and then access that object's childrenTodos and pushes the 
    new object (subtodo) into the array. 
*/
export function addSubTodoIntoTodosArray(id: number, newObj: ITodo, array: ITodo[] | null | undefined) {
    array?.forEach((objEntry) => {
        if (objEntry.id === id) {   // if the id's match, I found the correct object to perform the insert
            objEntry.childrenTodos.push(newObj);    // push new object (subtodo) into childrenTodos array
        }
        // Goes deep inside the childrenTodos array until the right id's match, then I can add the subTodo, without this I can only go one subtodo deep
        return addSubTodoIntoTodosArray(id, newObj, objEntry.childrenTodos);
    });
    return array;
}
  