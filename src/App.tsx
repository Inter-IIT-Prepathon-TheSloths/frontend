// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePassword from "./pages/CreatePassword";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/ProtectedRoute";
import BackendRedirection from "./pages/BackendRedirection";
import { UserProvider } from "./context/context";
import SearchCompanyEntries from "./pages/Search";
import ResetPassword from "./pages/Authentication/ResetPassword";
import AskTwofa from "./pages/AskTwofa";
import Layout from "./layout/Layout";
import PageTitle from "./components/PageTitle";
import Company from "./pages/Dashboard/Company";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Settings from "./pages/Settings";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/backend_redirect"
                    element={<BackendRedirection />}
                />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route
                    path="/login"
                    element={
                        <>
                            <PageTitle title="Login | BizSights - Empower your investment decisions!" />
                            <SignIn />
                        </>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <>
                            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <SignUp />
                        </>
                    }
                />
                <Route path="/create_password" element={<CreatePassword />} />
                <Route path="/ask_twofa" element={<AskTwofa />} />

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
                    <Route
                        path="/company"
                        element={
                            <>
                                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Company />
                            </>
                        }
                    />

                    <Route
                        index
                        element={
                            <>
                                <PageTitle title="Search | Bizsights" />
                                <SearchCompanyEntries />
                            </>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <>
                                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Settings />
                            </>
                        }
                    />


                </Route>
            </Routes>
            <Toaster position="top-right" />
        </Router>
    );
}

export default App;
