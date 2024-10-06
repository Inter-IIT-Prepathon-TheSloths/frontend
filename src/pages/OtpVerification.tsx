import { useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

interface Props {
    email: string;
    password: string;
}

const OtpVerification: React.FC<Props> = ({ email, password }) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("/auth/verify_code/signup", {
                email,
                code: otp
            })
            setLoading(false)
            if (response.status === 201) {
                toast.success(response.data.message)
                setTimeout(() => {
                    return navigate("/login")
                }, 2000)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const resendVerificationLink = async () => {
        setLoading(true)
        try {
            await axios.post("/auth/send_verification/signup", {
                email, password
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <>
            {
                !loading ?
                    <div>
                        <p>
                            Please enter the otp sent to your email: {email.substring(0, Math.min(4, email.length))}****{email.split("@")[1]}
                        </p>
                        <form onSubmit={submitHandler}>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                        <p className="text-blue-400 cursor-pointer" onClick={resendVerificationLink}>Resend verification otp?</p>
                    </div> :
                    <Loader />
            }
        </>
    )
}

export default OtpVerification