import { useState } from 'react'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const AskTwofa = () => {
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const response = await axios.get("/auth/twofa_login", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-2FA-Code": code
            }
        })
        const { token, refreshToken } = response.data
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        navigate("/")
    }

    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[25%] h-[25%] p-4 flex flex-col items-center">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Two factor Authentication
                    </h3>
                </div>
                <input
                    type="text"
                    placeholder="Enter 2FA Code or Backup code"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={code} onChange={(e) => setCode(e.target.value)}
                />
                <button className='bg-blue-500 text-white rounded-lg py-3 px-5 mt-3' onClick={handleSubmit}>Verify</button>
            </div>
        </div>
    )
}

export default AskTwofa