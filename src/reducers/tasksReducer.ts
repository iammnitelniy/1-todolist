import {TasksType, TaskType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: any): any => {
    switch (action.type) {
        case "REMOVE-TASK": return {
            ...state,
            [action.payload.todoListID]: state[action.payload.todoListID].filter((t: TaskType)=> t.id !== action.payload.taskID)
        }
        case "ADD-TASK": const newState = state[action.payload.todoListID] !== undefined
            ? {
                ...state,
                [action.payload.todoListID]: [{ id: v1(), title: action.payload.taskTitle, isDone: false }, ...state[action.payload.todoListID]]
            }
            : {
                ...state,
                [action.payload.todoListID]: []
            };
            return newState;
            // ...state,
            // [action.payload.todoListID]: [{ id: v1(), title: action.payload.taskTitle, isDone: false }, ...state[action.payload.todoListID]]


        case "DELETE-TASKS": return {
            ...state,
            [action.payload.todoListID]: [],
        };

        case "SET-TASKS": return {...state};

        case "ADD-NEWTASKS": return {...state, [action.payload.newTodoListID]: []};

        case "CHANGE-TASKSTATUS": return {
            ...state,
            [action.payload.todoListID]: state[action.payload.todoListID].map(t => (t.id === action.payload.taskID ? { ...t, isDone: action.payload.isDone } : t)),
        };
        case "CHANGE-TASKTITLE": return {
            ...state,
            [action.payload.todoListID]: state[action.payload.todoListID].map(t => (t.id === action.payload.taskID ? { ...t, title: action.payload.title } : t))
        };

        default: return state
    }
}

export type ACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type:"REMOVE-TASK",
        payload: {todoListID, taskID}
    } as const
}

export const addTaskAC = (todoListID: string, taskTitle: string) => {
    return {
        type:"ADD-TASK",
        payload: {todoListID, taskTitle}
    } as const
}

export const deleteTasksAC = (todoListID: string, ) => {
    return {
        type:"DELETE-TASKS",
        payload: {todoListID}
    } as const
}
export const setTasksAC = () => {
    return {
        type:"SET-TASKS",

    } as const


}
export const newTasksForTodoListAC = (newTodoListID: string) => {
    return {
        type: "ADD-NEWTASKS",
        payload: {newTodoListID}

    } as const
}

export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type:"CHANGE-TASKSTATUS",
        payload: {todoListID, taskID, isDone}

    } as const

}
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type:"CHANGE-TASKTITLE",
        payload: {todoListID, taskID, title}

    } as const

}




