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
    <div>
      Please Create a password to proceed
      <AskForPassword password={password} setPassword={setPassword} onSubmit={passwordHandler} />
    </div>
  )
}

export default CreatePassword