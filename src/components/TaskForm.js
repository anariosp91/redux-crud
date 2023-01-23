import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask }  from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
const [ task, setTask ] = useState({
  title: '',
  description: ''
})

const dispatch = useDispatch()
const navigate = useNavigate()
const params = useParams()
const tasks = useSelector(state => state.tasks)

const handleChange = e => {
  setTask({
    ...task,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = e => {
  e.preventDefault()

    if(params.id){
      dispatch(updateTask(task)) 
    }else{
      dispatch(addTask({
        ...task,
        id: uuid()
      }))
    }
  
  navigate('/')
}

useEffect(() => {
  if(params.id){
    setTask(tasks.find(task => task.id === params.id))
  }
}, [params.id, tasks])


  return (
    <form
      className='bg-zinc-800 max-w-sm p-4'
      onSubmit={handleSubmit}>

        <label
          className='block text-xs font-bold mb-2 ' 
          htmlFor='title'>Task:</label>
        <input 
          name='title' 
          type='text' 
          placeholder='title' 
          onChange={handleChange} 
          value={task.title}
          className='w-full p-2 rounded-md bg-zinc-600 mb-2'/>

        <label 
          className='block text-xs font-bold mb-2'
          htmlFor='description'>Description:</label>
        <textarea 
        name='description' 
        placeholder='description' 
        onChange={handleChange} 
        value={task.description}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
        ></textarea>
      <button
        type='submit'
        className='bg-indigo-600 px-2 py-1 rounded-sm text-sm'>Guardar</button>
    </form>
  )
}

export default TaskForm
