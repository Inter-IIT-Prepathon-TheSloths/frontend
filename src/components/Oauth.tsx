import axios from "../utils/axiosInstance"

const Oauth = () => {
    const oauthLoginHandler = async (provider: string) => {
        const response = await axios.get(`/auth/oauth/${provider}`)
        if (response.data?.url) {
            window.location.href = response.data.url;
        }
    }

    return (
        <div className='flex gap-4'>
            <button type="button" onClick={() => oauthLoginHandler("google")} className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span>
                    <img src="/google.svg" alt="G" />
                </span>
                Google
            </button>
            <button type="button" onClick={() => oauthLoginHandler("github")} className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span>
                    <img src="/github-mark.svg" width={24} height={24} />
                </span>
                GitHub
            </button>
        </div>
    )
}

export default Oauth