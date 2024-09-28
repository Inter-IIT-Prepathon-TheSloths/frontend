import { useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const OtpVerification = () => {
    const [otp, setOtp] = useState("")
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const navigate = useNavigate()

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.get(`/auth/verify_code?email=${email}&code=${otp}`)
        if (response.status === 201) {
            navigate("/login")
        }
    }

    const resendVerificationLink = async () => {
        const response = await axios.get(`/auth/resend_code?email=${email}`)
        if (response.status === 200) {
            return toast.success("Verification link has been sent again")
        }
    }

    return (
        <div>
            <p>
                Please enter the otp sent to your email
            </p>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <p className="text-blue-400 cursor-pointer" onClick={resendVerificationLink}>Resend verification otp?</p>
        </div>
    )
}

export default OtpVerification