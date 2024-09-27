// import { useEffect } from "react"
import { useEffect } from "react"
import axios from "../utils/axiosInstance"

const Login = () => {
  const googleLoginHandler = async () => {
    const response = await axios.get("/auth/google")
    window.location.href = response.data.url
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/"
    }
  }, [])


  return (
    <button onClick={googleLoginHandler}>Google</button>
  )
}

export default Login