import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

const BackendRedirection = () => {
    const [_, setSearchParams] = useSearchParams();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token")
        if (token) {
            localStorage.setItem("token", token)
        }
        setSearchParams()
        window.location.href = "/"
    }, [])
    return (
        <div></div>
    )
}

export default BackendRedirection