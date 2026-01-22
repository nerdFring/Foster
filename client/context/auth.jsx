import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logOutUser } from "../src/auth/getMe";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await getMe();
      setUser(data); 
      setLoading(false);
    };
    checkAuth();
  }, []);

  const logOut=async()=>{
    await logOutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading ,logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
