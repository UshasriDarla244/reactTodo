import { 
    CREATE_TODO, 
    REMOVE_TODO, 
    MARK_TODO,
    LOAD_TODOS_FAILURE,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    } from "./actions";

// export const isLoading = (state= false, action) => {
//     const {type} = action;

//     switch(type){
//         case LOAD_TODOS_IN_PROGRESS:
//             return true;
//         case LOAD_TODOS_SUCCESS:
//             return false;
//         case LOAD_TODOS_FAILURE:
//             return false;
//         default:
//             return state;
//     }
// }

export const initialState = {
    isLoading : false,
    data : [],
}

export const todos = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case CREATE_TODO: {
            const { todo } = payload;
            return {
                ...state,
                data: state.data.concat(todo),
            };
            // const newTodo ={
            //     text,
            //     isCompleted: false,
            
        //     return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { todo: todoToRemove } = payload;
            return {
                ...state,
                data: state.data.filter(todo=> todo.id !== todoToRemove.id)
            };
        }
        case MARK_TODO: {
            const { todo: todoId } = payload;
            return {
                ...state,
                data: state.data.map(todo => {
                if(todo.id === todoId.id){
                    return {...todo, isCompleted: true};
                }

                return todo;
            }),
        };
        }
        
        case LOAD_TODOS_SUCCESS: {
            const { todos } = payload;
            return {
                ...state,
                isLoading: false,
                data: todos,
            };
        }
        case LOAD_TODOS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true, 
            };
        case LOAD_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false, 
            };
        default:
            return state;
    }
}