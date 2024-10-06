import { useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

interface Props {
    email: string;
    password: string;
    use: string;
}

const OtpVerification: React.FC<Props> = ({ email, password, use }) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const showPassword = use === "reset_password"

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let body;
        if (use === "reset_password") {
            if (newPassword.length < 6) {
                console.log("Password must be at least 6 characters")
                return toast.error("Password must be at least 6 characters")
            }

            if (newPassword != confirmPassword) {
                console.log("Passwords do not match")
                return toast.error("Passwords do not match")
            }
            body = {
                email,
                code: otp,
                password: newPassword
            }
        } else {
            body = {
                email,
                code: otp
            }
        }
        try {
            setLoading(true)
            const response = await axios.post(`/auth/verify_code/${use}`, body)
            setLoading(false)
            toast.success(response.data.message)
            if (use === "signup") {
                setTimeout(() => {
                    return navigate("/login")
                }, 1000)
            } else if (use === "reset_password") {
                setTimeout(() => {
                    return navigate("/login")
                }, 1000)
            } else if (use === "update_password") {
                await axios.delete("/auth/logout_all", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                localStorage.removeItem("token")
                localStorage.removeItem("refreshToken")
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
            await axios.post(`/auth/send_verification/${use}`, {
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
                            {
                                showPassword &&
                                <>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Create Password" />
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${password != confirmPassword ? "outline-red-400" : "outline-none"}`} placeholder="Confirm Password" />
                                </>
                            }
                            <button type="submit">Submit</button>
                        </form>
                        <p className="text-blue-400 cursor-pointer" onClick={resendVerificationLink}>Resend verification otp?</p>
                    </div>
                    :
                    <Loader />
            }
        </>
    )
}

export default OtpVerification