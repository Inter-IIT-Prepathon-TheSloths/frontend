import { useNavigate } from "react-router-dom"
import axios from "../utils/axiosInstance"

const Navbar = () => {
    const navigate = useNavigate()
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
        <div className="flex justify-end w-full absolute top-0 left-0">
            <button onClick={logoutHandler}>
                Logout
            </button>
        </div>
    )
}

export default Navbar