import { useState } from 'react';
import AskForPassword from '../components/AskForPassword';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SwitcherThree from '../components/Switchers/SwitcherThree';
import axios from '../utils/axiosInstance';
import Modal from '../components/Modal';
import OtpVerification from './OtpVerification';
import Loader from '../components/Loader';
// import { useUser } from '../context/context';
// import userThree from '../images/user/user-03.png';

const Settings = () => {
  // const { user } = useUser();
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/auth/send_verification/update_password", {
        email, password
      })
      setLoading(false)
      if (response.status === 200) {
        return openModal()
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
          {
            !loading ?
              <div className="col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Update Password
                    </h3>
                  </div>
                  <div className="p-7 flex flex-col items-center">
                    <div className="w-[80%]">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <AskForPassword password={password} setPassword={setPassword} onSubmit={handleSubmit} />
                  </div>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <OtpVerification email={email} password={password} use='update_password' />
                  </Modal>
                </div>
              </div> :
              <Loader />
          }
        </div>
      </div>
    </>
  );
};

export default Settings;
