import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreatePassword from "./pages/CreatePassword";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/ProtectedRoute";
import BackendRedirection from "./pages/BackendRedirection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/backend_redirect" element={<BackendRedirection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_password" element={<CreatePassword />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
