import { createTodo, removeTodo, loadTodosInProgress, loadTodosSuccess, loadTodosFailure, markTodo } from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch(e){
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos',{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));

    } catch(e){
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`,{
            method: 'delete',
        });
        const removeTodo1 = await response.json();
        dispatch(removeTodo(removeTodo1));
    }catch(e){
        dispatch(displayAlert(e));
    }
}

export const updateTodoRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`,{
            method: 'post',
        });
        const markTodo1 = await response.json();
        dispatch(markTodo(markTodo1));
    }catch(e){
        dispatch(displayAlert(e));
    }
}


export const displayAlert = text => () => {
    alert(text);

}; 