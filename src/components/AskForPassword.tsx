import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface PasswordFormProps {
    password: string;
    setPassword: (value: string) => void;
    onSubmit: () => Promise<void>;
}

const AskForPassword: React.FC<PasswordFormProps> = ({ password, setPassword, onSubmit }) => {

    const [confirmPassword, setConfirmPassword] = useState("")

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

        await onSubmit();
    }
    return (
        <form onSubmit={passwordHandler}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${password != confirmPassword ? "outline-red-400" : "outline-none"}`} placeholder="Confirm Password" />

            <button type="submit">Submit</button>
        </form>
    )
}

export default AskForPassword