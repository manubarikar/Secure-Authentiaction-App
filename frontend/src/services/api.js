import axios from "axios";
const API=axios.create({
    baseURL:"https://localhost:5000"
})

export const loginUser=(data)=>(API.post("/api/login",data))

export const getProfile=(token)=>{
    API.get("/api/profile",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const logoutUser=(token)=>{
    API.post("/api/logout",{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}