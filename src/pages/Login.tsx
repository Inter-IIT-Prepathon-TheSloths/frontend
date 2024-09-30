// import { useEffect } from "react"
import { useEffect, useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const oauthLoginHandler = async (provider: string) => {
    const response = await axios.get(`/auth/oauth/${provider}`)
    window.location.href = response.data.url
  }

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await axios.post("/auth/login", {
      email, password
    })
    const { jwt } = response.data
    localStorage.setItem("token", jwt)
    navigate("/")
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])


  return (
    <>
      <button onClick={() => oauthLoginHandler("google")}>Google</button>
      <button onClick={() => oauthLoginHandler("github")}>GitHub</button>
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
      </form>
    </>
  )
}

export default Login