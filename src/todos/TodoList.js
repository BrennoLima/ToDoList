import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import NewTodoForm from './NewTodoForm'
import TodoListItem from './TodoListItem'
import {getTodosLoading, getIncompleteTodos, getCompletedTodos} from '../Redux/selectors'
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from '../Redux/thunks'
import { isLoading } from '../Redux/reducers';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({getIncompleteTodos, getCompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm/>
            {Object.keys(getIncompleteTodos).length > 0 ? <h3>Incomplete Todos</h3> : null}
            {
                getIncompleteTodos.map(todo => 
                        <TodoListItem
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletedPressed={onCompletedPressed}
                        />
                )
            }
            {Object.keys(getCompletedTodos).length > 0 ? <h3>Completed Todos</h3> : null}
            {
                getCompletedTodos.map(todo => 
                        <TodoListItem
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletedPressed={onCompletedPressed}
                        />
                )
            } 
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
    
}

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    getCompletedTodos: getCompletedTodos(state),
    getIncompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),

})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);