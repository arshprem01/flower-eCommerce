import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const ADMIN_KEY = 'omkar_admin';
const ADMIN_PASSWORD = 'omkar2024';

export const AdminProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if already logged in
        const adminSession = localStorage.getItem(ADMIN_KEY);
        if (adminSession === 'authenticated') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem(ADMIN_KEY, 'authenticated');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(ADMIN_KEY);
        setIsAuthenticated(false);
    };

    return (
        <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export default AdminContext;
