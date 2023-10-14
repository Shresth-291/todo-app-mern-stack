import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'

const Header = () => {

    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context)
    // console.log(useContext(Context))

    const logoutHandler = async () => {
        setLoading(true)
        try {
            await axios.post(`${server}/users/logout`,{withCredentials: true,})
            // console.log(data.message)
            setLoading(false)
            setIsAuthenticated(false)
            toast.success('Logged Out Successfully')
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(true)
            toast.error(error)
            // console.log(error)
        }
        
    }

  return (
        <nav className='header'>
            <div>
                <h2>Todo App.</h2>
            </div>
            <article>
                <Link to={'/'}>Home</Link>
                <Link to={'/profile'}>Profile</Link>
                {
                    isAuthenticated ? (<button className='btn' disabled={loading} onClick={logoutHandler}>Log Out</button>) : (<Link to={'/login'}>Login</Link>)
                }
            </article>
        </nav>
    )
}

export default Header