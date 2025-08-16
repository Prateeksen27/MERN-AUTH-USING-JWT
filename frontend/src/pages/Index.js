import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
const Index = () => {
  const {authUser, logout} = useAuthStore();
  return (
    <div>Index
        <button onClick={logout}>logout</button>
    </div>
    
  )
}

export default Index