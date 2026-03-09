import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { loginUser } from "../services/api";

function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!username || !password){
            setError("Password must be at least 6 characters")
            return
        }

        try{
            setLoading(true)
            const user=await loginUser(username,password)
            localStorage.setItem("token",res.data.token)
            navigate("/dashboard")
        }catch(error){
            setError("Invalid credentials")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="UserName"
                onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <input placeholder="Password"
                type="password"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }} />

                <button type="submit">{
                    loading ? "Loading.." : "Login"}</button>
            </form>
            <p className="error">{error}</p>
        </div>
    )
}

export default Login;