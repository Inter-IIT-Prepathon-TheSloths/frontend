import React, { useState } from 'react'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const AskTwofa = () => {
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.get("/auth/twofa_login", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-2FA-Code": code
            }
        })
        const { token, refreshToken } = response.data
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        navigate("/")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter 2FA code or Backup code" value={code} onChange={e => setCode(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AskTwofa