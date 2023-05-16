import {TasksType, TaskType} from "../App";

export const todolist2Reducer = (state: TasksType, action: any): any => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter((t: TaskType) => t.id !== action.payload.taskID)
            }
        default:
            return state
    }
    }

    export type TodoList2ReducerType = RemoveTodolist2ACType
    type RemoveTodolist2ACType = ReturnType<typeof removeTodolist2AC>
    export const removeTodolist2AC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST2',
        payload: {id}
    }
    }

export type AddTodolist2ACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST2',
        payload: {id}
    }
}