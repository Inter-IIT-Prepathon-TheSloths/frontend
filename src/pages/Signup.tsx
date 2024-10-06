import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from '../utils/axiosInstance'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Oauth from '../components/Oauth'
import OtpVerification from './OtpVerification'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showOtp, setShowOtp] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password.length < 6) {
            return toast.error("Please enter a password >= 6 characters")
        }

        if (password != confirmPassword) {
            return toast.error("Passwords do not match")
        }

        setLoading(true)
        try {
            const response = await axios.post("/auth/send_verification/signup", {
                email, password
            })
            setLoading(false)
            if (response.status === 200) {
                return setShowOtp(true)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <>
            {
                !loading ?
                    !showOtp ?
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                <button type="submit">Submit</button>
                            </form>
                            <p>
                                Already have an account?
                                <Link to="/login">Login</Link>
                            </p>
                            <p>
                                ----- Or Login with -----
                            </p>
                            <Oauth />
                        </div>
                        :
                        <OtpVerification email={email} password={password} use='signup' />
                    :
                    <Loader />
            }
        </>
    )
}

export default Signup