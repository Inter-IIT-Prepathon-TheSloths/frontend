import { useState } from 'react';
import AskForPassword from '../components/AskForPassword';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SwitcherThree from '../components/Switchers/SwitcherThree';
import axios from '../utils/axiosInstance';
// import { useUser } from '../context/context';
// import userThree from '../images/user/user-03.png';

const Settings = () => {
  // const { user } = useUser();
  const [password, setPassword] = useState("")
  const [_, setLoading] = useState(false)
  const [email, __] = useState("")
  const [___, setShowOtp] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/auth/send_verification/update_password", {
        email, password
      })
      setLoading(false)
      if (response.status === 200) {
        return setShowOtp(true)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Two Factor Information
                </h3>
              </div>
              <div className="p-7 flex justify-center items-center">
                <div className='flex gap-5 items-center'>
                  <span>Two Factor </span>
                  <SwitcherThree />
                </div>

              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Update Password
                </h3>
              </div>
              <div className="p-7">
                <AskForPassword password={password} setPassword={setPassword} onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
