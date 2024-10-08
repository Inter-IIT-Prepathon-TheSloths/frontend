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
            <div className="p-6.5">

                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AskForPassword