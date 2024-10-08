import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/context';
import axios from '../../utils/axiosInstance';
import QRCodeComponent from '../QRCodeComponent';
import Modal from '../Modal';
import PinInput from 'react-pin-input';

const SwitcherThree = () => {
  const { user } = useUser()
  const [enabled, setEnabled] = useState(user?.TwofaEnabled);
  const [totpUrl, setTotpUrl] = useState("")
  const [secret, setSecret] = useState("")
  const [totp, setTotp] = useState("")
  const [backupCodes, setBackupCodes] = useState([])
  const [showBackups, setShowBackups] = useState(false)
  // const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleGetSecretKey = async () => {
    const response = await axios.get("/auth/generate_2fasecret", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const { secret, issuer, accountName } = response.data
    const url = `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}`;
    setTotpUrl(url)
    setSecret(secret)
    return openModal()
  }

  const handleEnable = async () => {
    const response = await axios.get("/auth/enable_2fa", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-2FA-Code": totp,
      },
    })

    const codes = response.data?.backupCodes;
    setEnabled(true);
    setBackupCodes(codes)
    downloadFile(codes)
    setShowBackups(true)
  }

  const handleDisable = async () => {
    return openModal()
  }

  const handleChange = async () => {
    if (enabled) {
      await handleDisable()
    } else {
      await handleGetSecretKey()
    }
  }

  const downloadFile = (codes: Array<string>) => {
    const fileContent = codes.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BackupCodes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <label
        htmlFor="toggle3"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle3"
            className="sr-only"
            onChange={handleChange}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
              }`}
          >
            <span className={`hidden ${enabled && '!block'}`}>
              <svg
                className="fill-white dark:fill-black"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill=""
                  stroke=""
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
            <span className={`${enabled && 'hidden'}`}>
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </label>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          totpUrl && !showBackups && (
            <div className='flex flex-col items-center gap-2'>
              <p>Scan the following QR code or enter the secret in your Authenticator app like Google Authenticator or Twilio Authy... :</p>
              <QRCodeComponent url={totpUrl} />
              <p> <span className='font-bold'> Secret: </span> {secret}</p>

              {/* <input type="text" placeholder='Enter TOTP' value={totp} onChange={e => setTotp(e.target.value)} /> */}
              <div className="otp-container">
                <PinInput
                  length={6}
                  focus
                  type="numeric"
                  inputMode="text"
                  onChange={(value) => setTotp(value)}
                  onComplete={(value) => setTotp(value)}
                  style={{ padding: '10px' }}
                  inputStyle={{
                    borderColor: 'gray',
                    borderRadius: '5px',
                    margin: '5px',
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                  }}
                />
              </div>
              <button className='bg-blue-500 text-white rounded-lg p-3' onClick={handleEnable}>Enable</button>
            </div>
          )
        }
        {
          showBackups && (
            <div className='flex flex-col items-center'>
              <p>Backup codes have been downloaded to your device. Please keep them safe and secure. Do not share them with anyone.</p>
              <div className='flex gap-3 mt-3'>
                <button className='bg-gray-400 rounded-lg p-3 text-white' onClick={() => downloadFile(backupCodes)}>Download Again</button>
                <button className='bg-red-500 rounded-lg p-3 text-white' onClick={closeModal}>Close</button>
              </div>
            </div>
          )
        }
      </Modal>
    </div>
  );
};

export default SwitcherThree;
