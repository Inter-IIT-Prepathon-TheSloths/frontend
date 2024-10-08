import { useEffect, useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import AskForPassword from "../components/AskForPassword"

const CreatePassword = () => {

  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  const passwordHandler = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")

    const response = await axios.post("/auth/create_password", {
      id,
      password
    })
    const { token, refreshToken } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-[50%] h-[50%]">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Please Create a password to be logged in later
          </h3>
        </div>
        <AskForPassword password={password} setPassword={setPassword} onSubmit={passwordHandler} />
      </div>
    </div>
  )
}

export default CreatePassword