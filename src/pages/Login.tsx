import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const googleLoginHandler = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/google")
      window.location.href = response.data

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")
    if (token) {
      localStorage.setItem("token", token)
      navigate("/")
    }
  }, [navigate])
  return (
    <button onClick={googleLoginHandler}>Google</button>
  )
}

export default Login