import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import TodoItem from '../components/TodoItem'
import { Navigate } from 'react-router-dom'

const Home = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(false)

  const {isAuthenticated} = useContext(Context)

  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials: true
      })
      toast.success(data.message)
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setRefresh((prev)=>!prev)
    }
  }

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials: true
      })
      toast.success(data.message)
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setRefresh((prev)=>!prev)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/task/new`, {
        title, description
      },
      {
        withCredentials : true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      setTitle('')
      setDescription('')
      toast.success(data.message)
      setLoading(false)
      setRefresh((prev)=>!prev)
    } catch (error) {
        toast.success(error.response.data.message)
        setLoading(false)
        setRefresh((prev)=>!prev)
    }
  }

  useEffect(() => {
      axios.get(`${server}/task/my`, {
        withCredentials: true
      })
      .then((res) => setTasks(res.data.tasks))
      .catch((e) => toast.error(e.responses.data.message))
  }, [refresh])

  if(!isAuthenticated) return <Navigate to={'/login'}/>

  return (
    <div className='container'>
      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' required/>
            <button type='submit' disabled={loading}>Add a Task</button>
          </form>
        </section>
      </div>
      <section className='todosContainer'>
        {
          tasks.map((i) => (
            <TodoItem title={i.title} description={i.description} isCompleted={i.isCompleted} key={i._id} id={i._id} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
          ))
        }
      </section>
    </div>
  )
}

export default Home