import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BackendRedirection = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token")
        const refreshToken = urlParams.get("refreshToken")
        const askForTwofa = urlParams.get("askForTwofa")
        const id = urlParams.get("id")
        if (token && (refreshToken != null)) {
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            if (askForTwofa === "true")
                return navigate("/ask_twofa")
            else return navigate("/")
        } else if (id) {
            return navigate(`/create_password?id=${id}`)
        }
    }, [])
    return (
        <div></div>
    )
}

export default BackendRedirection