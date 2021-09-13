import React, {useEffect} from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTodos, removeTodoRequest, updateTodoRequest } from './thunks';
import { getCompletedTodos, getIncompletedTodos, getTodos, getTodosLoading } from './selectors';
// import { isLoading } from './reducers';
import './TodoList';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;       
`;


const TodoList = ({ todos = [], completedTodos,inCompletedTodos, onRemovePressed, onMarkPressed, isLoading, onLoadTodos}) => 
    {
        useEffect(() => {
            onLoadTodos();
        }, []);
        const loadingMessage = <div>Loading todos...</div>
        const content = (
            <ListWrapper>
            <NewTodoForm />

            {/* gives error, if todos contain no values/ empty array */}
            {/* {todos.map(todo => <TodoListItem
                                todo={todo} 
                                onRemovePressed={onRemovePressed} 
                                onMarkPressed={onMarkPressed}/>)} */}
            <div className="todo-item-container">
                <><h1>InCompletedTodos</h1></>
                    {inCompletedTodos.map(todo => <TodoListItem
                                todo={todo} 
                                onRemovePressed={onRemovePressed} 
                                onMarkPressed={onMarkPressed}/>)}
            <div className="todo-item-container">
                <><h1>completedTodos</h1></>
                    {completedTodos.map(todo => 
                                <TodoListItem
                                todo={todo} 
                                onRemovePressed={onRemovePressed} 
                                onMarkPressed={onMarkPressed}/>)}
            </div> 

            </div>
                        {/* {todos.map(todo => {if (todo) {
                        <TodoListItem
                                todo={todo} 
                                onRemovePressed={onRemovePressed} 
                                onMarkPressed={onMarkPressed}/> ;
                        }
                       else{
                           <div><h1>null vals</h1></div>
                       }})}
                    */}
                                
            </ListWrapper>
        );

        return isLoading ? loadingMessage : content;
    };

const mapStateToProps = state => ({
    isLoading : getTodosLoading(state),
    // todos : getTodos(state),
    completedTodos: getCompletedTodos(state),
    inCompletedTodos: getIncompletedTodos(state),
   
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed : id => dispatch(removeTodoRequest(id)),
    onMarkPressed : id => dispatch(updateTodoRequest(id)),
    onLoadTodos : () => dispatch(loadTodos()),
})


export default connect(mapStateToProps,mapDispatchToProps)(TodoList);