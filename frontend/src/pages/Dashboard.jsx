import {useState, useEffect} from "react"
import {getProfile, logoutUser} from "../services/api"

import { useNavigate } from "react-router-dom"

function Dashboard(){
    const [user,setUser]=useState(null)
    const navigate=useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchProfile=async()=>{
            try{
                const res=await getProfile(token);
                setUser(res.data);
            }catch(error){
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        fetchProfile();
    },[])

    const handleLogout = async()=>{
        await logoutUser(token)
        localStorage.removeItem("token")
        navigate("/login")
    }

    if(!user) return <h2>Loading...</h2>

    return(
        <div className="container">
            <h2>{user.message}</h2>
            <p>Username: {user.username}</p>
            <p>Login Time:{user.loginTime}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;