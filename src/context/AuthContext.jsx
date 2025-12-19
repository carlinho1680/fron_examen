import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser({
          username: decoded.sub || decoded.username, 
          correo: decoded.correo || decoded.email,
          rol: decoded.rol
        });
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    

    setUser({
      username: data.username,
      correo: data.correo,
      rol: data.rol
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}