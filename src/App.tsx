import {useReducer} from 'react'

import './styles/App.css'
import { v1 } from 'uuid'

// import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { TodoList } from './components/TodoList/TodoList'
import {
  addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
  deleteTasksAC,
  // newTasksForTodoListAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer
} from "./reducers/tasksReducer";
import {
  addTodoListAC,
  changeFilterAC,
  changeTitleAC,
  removeTodoListAC,
  todoListReducer
} from "./reducers/todoListReducer";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: TaskType[]
}

const App = () => {
  const todoListID1 = v1()
  const todoListID2 = v1()

  const [todoLists, dispatchTodoLists] = useReducer(todoListReducer,[
    { id: todoListID1, title: 'What to learn', filter: 'all' },
    { id: todoListID2, title: 'What to learn', filter: 'all' },
  ])
  const [tasks, dispatchTasks] = useReducer(tasksReducer,{
    [todoListID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todoListID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const changeTodoListFilter = (todoListID: string, value: FilterValuesType) => {
    // setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, filter: value } : tl)))
    dispatchTodoLists(changeFilterAC(todoListID, value))
  }
  const changeTodoListTitle = (todoListID: string, title: string) => {
    dispatchTodoLists(changeTitleAC(todoListID, title))
    // setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, title } : tl)))
  }
  const removeTodoList = (todoListID: string) => {
    // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    dispatchTodoLists(removeTodoListAC(todoListID))
    dispatchTasks(deleteTasksAC(todoListID))
    dispatchTasks(setTasksAC())

  }
  const addTodoList = (title: string) => {
    const newTodoListID = v1()
    dispatchTodoLists(addTodoListAC(newTodoListID, title))
    // dispatchTasks(newTasksForTodoListAC(newTodoListID))
    dispatchTasks(addTaskAC(newTodoListID, title))
    // setTasks({ ...tasks, [newTodoList.id]: [] })
  }


  const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
    // const updateTasks = tasks[todoListID].map(t => (t.id === taskID ? { ...t, isDone: isDone } : t))
    //
    // setTasks({ ...tasks, [todoListID]: updateTasks })
    dispatchTasks(changeTaskStatusAC(todoListID, taskID, isDone))
  }
  const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
    // const updateTasks = tasks[todoListID].map(t => (t.id === taskID ? { ...t, title } : t))
    //
    // setTasks({ ...tasks, [todoListID]: updateTasks })

    dispatchTasks(changeTaskTitleAC(todoListID, taskID, title))
  }
  const removeTask = (todoListID: string, taskID: string) => {
    dispatchTasks(removeTaskAC(todoListID, taskID))
  }
  const addTask = (todoListID: string, taskTitle: string) => {
    dispatchTasks(addTaskAC(todoListID, taskTitle))

  }

  const getTasksForRender = (tasksList: TaskType[], filterValue: FilterValuesType): TaskType[] => {
    switch (filterValue) {
      case 'active':
        return tasksList.filter(t => !t.isDone)
      case 'completed':
        return tasksList.filter(t => t.isDone)
      default:
        return tasksList
    }
  }

  const todoListsMap = todoLists.map((tl: any) => {
    const filteredTasks = getTasksForRender(tasks[tl.id], tl.filter)

    return (
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        filter={tl.filter}
        changeTodoListFilter={changeTodoListFilter}
        changeTodoListTitle={changeTodoListTitle}
        removeTodoList={removeTodoList}
        tasks={filteredTasks}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        addTask={addTask}

      />
    )
  })

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoListsMap}
    </div>
  )
}

export default App
