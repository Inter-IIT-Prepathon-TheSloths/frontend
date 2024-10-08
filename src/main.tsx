import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

createRoot(document.getElementById('root')!).render(
  <App />
)
