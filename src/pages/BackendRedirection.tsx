import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const BackendRedirection = () => {
    const [_, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token")
        const refreshToken = urlParams.get("refreshToken")
        const id = urlParams.get("id")
        if (token && refreshToken) {
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
        } else if (id) {
            setSearchParams()
            return navigate(`/create_password?id=${id}`)
        }
        setSearchParams()
        navigate("/")
    }, [])
    return (
        <div></div>
    )
}

export default BackendRedirection