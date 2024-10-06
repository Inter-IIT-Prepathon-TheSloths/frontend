import { useNavigate } from "react-router-dom"
import axios from "../utils/axiosInstance"
import { useUser } from "../context/context"
import { Link } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    const logoutHandler = async () => {
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refreshToken')
        await axios.delete("/auth/logout", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Refresh-Token": refreshToken
            }
        })
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate("/login")
    }
    return (
        <div className="flex justify-between items-center w-full absolute top-0 left-0">
            {user?.TwofaEnabled ? null : (
                <div className="flex-1 text-center">
                    Please <Link to="/twofa_enable" className="text-blue-500 underline">enable</Link> 2-Factor Authentication for your security
                </div>
            )}
            <button className="ml-4" onClick={logoutHandler}>
                Logout
            </button>
        </div>
    )
}

export default Navbar