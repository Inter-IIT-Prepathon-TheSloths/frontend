import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = memo(({ }) => {
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {

    }, [pathname]);

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
});

export default Layout;