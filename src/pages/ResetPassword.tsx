import { useState } from 'react'
import axios from '../utils/axiosInstance'
import OtpVerification from './OtpVerification'
import Loader from '../components/Loader'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [showOtp, setShowOtp] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        try {
            const response = await axios.post("/auth/send_verification/reset_password", {
                email,
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
                                <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type='submit'>Submit</button>
                            </form>
                        </div> :
                        <OtpVerification email={email} password='' use='reset_password' /> :
                    <Loader />
            }
        </>
    )
}

export default ResetPassword