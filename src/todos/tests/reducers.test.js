import { expect } from 'chai';
import { todos } from '../reducers';

describe('Todos reducer', ()=>{
    it('Adds a new toto when CREATE_TODO is received',() => {
        const fakeTodo = { text : 'hello', isCompleted: false};
        const fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo,
            },
        }
        const originalState = {isLoading: false, data : [] };

        const expected = {
            isLoading : false,
            data : [fakeTodo],
        };

        const actual = todos(originalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    });
});