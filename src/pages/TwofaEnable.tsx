import { useState } from 'react'
import { useUser } from '../context/context'
import axios from '../utils/axiosInstance'
import QRCodeComponent from '../components/QRCodePage'
import { useNavigate } from 'react-router-dom'

const Twofa = () => {
    const { user } = useUser()
    const [totpUrl, setTotpUrl] = useState("")
    const [secret, setSecret] = useState("")
    const [totp, setTotp] = useState("")
    const [backupCodes, setBackupCodes] = useState([])
    const [showBackups, setShowBackups] = useState(false)
    const navigate = useNavigate()

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
        console.log(response.data)
    }

    const handleEnable = async () => {
        const response = await axios.get("/auth/enable_2fa", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-2FA-Code": totp,
            },
        })
        const codes = response.data.backupCodes;
        setBackupCodes(codes)
        downloadFile(codes)
        setShowBackups(true)
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
            {
                (!user?.TwofaEnabled && !totpUrl) && <button onClick={handleGetSecretKey}>Enable 2FA</button>
            }
            {
                totpUrl && !showBackups && (
                    <div>
                        <p>Scan the following QR code or enter the secret in your Authenticator app like Google Authenticator or Twilio Authy... :</p>
                        <QRCodeComponent url={totpUrl} />
                        <p>Secret: {secret}</p>

                        <input type="text" placeholder='Enter TOTP' value={totp} onChange={e => setTotp(e.target.value)} />
                        <button onClick={handleEnable}>Enable</button>
                    </div>
                )
            }
            {
                showBackups && (
                    <div>
                        <p>Backup codes have been downloaded to your device. Please keep them safe and secure. Do not share them with anyone.</p>
                        <button onClick={() => downloadFile(backupCodes)}>Download Again</button>
                        <button onClick={() => navigate("/")}>Move to Home</button>
                    </div>
                )
            }
        </div>
    )
}

export default Twofa