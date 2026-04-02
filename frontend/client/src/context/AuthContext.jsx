import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock users for demo (when backend is unavailable)
const DEMO_USERS = [
  { _id: '1', name: 'محمد المدير', email: 'admin@souqstore.com', role: 'admin', avatar: '' },
  { _id: '2', name: 'أحمد محمود', email: 'ahmed@test.com', role: 'user', avatar: '' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { logout(); }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      // Demo mode fallback
      const demoUser = DEMO_USERS.find(u => u.email === email);
      if (demoUser && (password === 'admin123' || password === 'user123')) {
        const demoToken = 'demo-token-' + Date.now();
        setUser(demoUser);
        setToken(demoToken);
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true };
      }
      return { success: false, message: 'بيانات تسجيل الدخول غير صحيحة' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      // Demo mode
      const newUser = { _id: Date.now().toString(), name, email, role: 'user', avatar: '' };
      const demoToken = 'demo-token-' + Date.now();
      setUser(newUser);
      setToken(demoToken);
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
