import {FilterValuesType, TodoListType} from "../App";


export const todoListReducer = (state: any, action: any) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl: TodoListType) => tl.id !== action.payload.todoListID)

        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.newTodoListID, title: action.payload.title, filter: 'all'}, ...state]

        }
        case "CHANGE-FILTER": {
            return state.map((tl: TodoListType) => (tl.id === action.payload.todoListID ? {
                ...tl,
                filter: action.payload.value
            } : tl))

        }
        case "CHANGE-TODOLISTTITLE": {
            return state.map((el:TodoListType) => (el.id === action.payload.todoListID ?
                { ...el, title: action.payload.title }: el))

        }

        default:
            return state
    }
}
export type ACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todoListID}
    } as const
}
export const addTodoListAC = (newTodoListID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTodoListID, title}
    } as const
}
export const changeFilterAC = (todoListID: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todoListID, value}
    } as const
}
export const changeTitleAC = (todoListID: string, title: string) => {
    return {
         type: "CHANGE-TODOLISTTITLE",
         payload: {todoListID, title}
    } as const


}