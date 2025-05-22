import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import authService from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            if(userData?.token){
                try {
                    const decoded = jwtDecode(userData.token);
                    if(decoded.exp * 1000 < Date.now()) {
                        logout();
                    }
                    else{
                        setUser(userData);
                        setIsAuthenticated(true);
                    }
                }
                catch (error){
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);


    const login = async (username, password) => {
        try{
            const response = await authService.login(username, password);
            setUser(response);
            setIsAuthenticated(true);

            return { success: true };
        }
        catch(error){
            return { success: false, message: error.response?.data?.message || 'Login Failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;