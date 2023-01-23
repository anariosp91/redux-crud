import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/taskSlice.js'

export const store = configureStore({
    reducer: {
    tasks : tasksReducer
    }
})

