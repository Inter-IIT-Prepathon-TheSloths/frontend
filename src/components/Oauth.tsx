import axios from "../utils/axiosInstance"

const Oauth = () => {
    const oauthLoginHandler = async (provider: string) => {
        const response = await axios.get(`/auth/oauth/${provider}`)
        window.location.href = response.data.url
    }

    return (
        <div>
            <button onClick={() => oauthLoginHandler("google")}>Google</button>
            <button onClick={() => oauthLoginHandler("github")}>GitHub</button>
        </div>
    )
}

export default Oauth