// src/context/GlobalContext.tsx
'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Notify } from '../utils/script';

type GlobalContextType = {
  state: {[key: string]: any};
  setState: (state: {[key: string]: any}) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{[key: string]: any}>({});
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (searchParams.get('redirected') === 'true') {
      Notify('Unauthorize Access', 'error')
      router.push(pathname, { scroll: false, })
    }
  }, [searchParams])
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
