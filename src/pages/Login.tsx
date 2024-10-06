// import { useEffect } from "react"
import { useEffect, useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/auth/login", {
        email, password
      })
      setLoading(false)
      const { token, refreshToken } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      navigate("/")
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])


  return (
    <>
      {
        !loading ?
          <form onSubmit={loginHandler}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <p>
              <Link to="/recover_password">Forgot Password?</Link>
            </p>
            <div>
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </div>
          </form> :
          <Loader />
      }
    </>
  )
}

export default Login