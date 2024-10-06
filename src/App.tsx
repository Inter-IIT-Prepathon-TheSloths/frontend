import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreatePassword from "./pages/CreatePassword";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/ProtectedRoute";
import BackendRedirection from "./pages/BackendRedirection";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import { UserProvider } from "./context/context";
import SearchCompanyEntries from "./pages/Search";
import ResetPassword from "./pages/ResetPassword";
import Twofa from "./pages/TwofaEnable";
import AskTwofa from "./pages/AskTwofa";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/backend_redirect"
                    element={<BackendRedirection />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create_password" element={<CreatePassword />} />
                <Route path="/search" element={<SearchCompanyEntries />} />
                <Route path="/ask_twofa" element={<AskTwofa />} />
                {/* <Route path="/loader" element={<Loader />} /> */}

                <Route path="/reset_password" element={<ResetPassword />} />
                <Route
                    path=""
                    element={
                        <UserProvider>
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        </UserProvider>
                    }
                >
                    <Route path="/" element={<Home />} />
                    <Route path="/twofa_enable" element={<Twofa />} />
                </Route>
            </Routes>
            <Toaster position="top-right" />
        </Router>
    );
}

export default App;
