import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {

  const {isAuthenticated, user, loading} = useContext(Context)

  return (
    loading ? (<Loader />) : (
      isAuthenticated ? (<div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>) : ( <h1>Not Logged In</h1> )
    )
  )
}

export default Profile