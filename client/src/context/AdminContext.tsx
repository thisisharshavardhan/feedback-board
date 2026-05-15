import { createContext, useContext, useState, ReactNode } from 'react';

const DEMO_KEY = import.meta.env.VITE_ADMIN_KEY ?? 'change-this-secret-now';

interface AdminContextValue {
  isAdmin: boolean;
  adminKey: string;
  enterAdminMode: () => void;
  exitAdminMode: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('adminKey'));

  function enterAdminMode() {
    localStorage.setItem('adminKey', DEMO_KEY);
    setIsAdmin(true);
  }

  function exitAdminMode() {
    localStorage.removeItem('adminKey');
    setIsAdmin(false);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, adminKey: DEMO_KEY, enterAdminMode, exitAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
