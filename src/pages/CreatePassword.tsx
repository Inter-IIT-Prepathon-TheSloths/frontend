import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"

const CreatePassword = () => {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  const passwordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.length < 6) {
      console.log("Password must be at least 6 characters")
      return toast.error("Password must be at least 6 characters")
    }

    if (password != confirmPassword) {
      console.log("Passwords do not match")
      return toast.error("Passwords do not match")
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")

    const response = await axios.post("/auth/create_password", {
      id,
      password
    })
    const token = response.data.token
    localStorage.setItem("token", token)
    navigate("/backend_redirect")
  }

  return (
    <div>
      Please Create a password to proceed
      <form onSubmit={passwordHandler}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${password != confirmPassword ? "outline-red-400" : "outline-none"}`} placeholder="Confirm Password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreatePassword