import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password.length < 6) {
            return toast.error("Please enter a password >= 6 characters")
        }

        if (password != confirmPassword) {
            return toast.error("Passwords do not match")
        }

        const response = await axios.post("/auth/signup", {
            email, password
        })

        if (response.status === 201) {
            return navigate(`/otp?email=${email}`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup