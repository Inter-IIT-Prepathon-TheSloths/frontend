import React, { useEffect, useState } from 'react';
import { useUser } from '../context/context.tsx';
import { useNavigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsAuthenticated(!!user.id);
        }
    }, [user]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isAuthenticated && children}
        </>
    );
};

export default PrivateRoute;
