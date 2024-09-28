import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem("token")
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