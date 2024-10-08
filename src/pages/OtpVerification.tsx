import { useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import PinInput from 'react-pin-input';

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
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-3xl font-bold">
                            Verify Your Account
                        </p>
                        <p>
                            Enter the otp sent to your email: {email.substring(0, Math.min(4, email.length))}****{email.split("@")[1]}
                        </p>
                        <form onSubmit={submitHandler} className="flex flex-col gap-3 items-center">
                            <div className="otp-container">
                                <PinInput
                                    length={6}
                                    focus
                                    type="numeric"
                                    inputMode="text"
                                    onChange={(value) => setOtp(value)}
                                    onComplete={(value) => setOtp(value)}
                                    style={{ padding: '10px' }}
                                    inputStyle={{
                                        borderColor: 'gray',
                                        borderRadius: '5px',
                                        margin: '5px',
                                        width: '50px',
                                        height: '50px',
                                        textAlign: 'center',
                                    }}
                                />
                            </div>
                            {
                                showPassword &&
                                <>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </>
                            }
                            <button type="submit" className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90">Submit</button>
                        </form>
                        <p className="text-blue-500 cursor-pointer" onClick={resendVerificationLink}>Resend verification otp?</p>
                    </div>
                    :
                    <Loader />
            }
        </>
    )
}

export default OtpVerification