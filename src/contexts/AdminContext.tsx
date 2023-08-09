import { useContext, createContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
// import { supabase } from './initSupabase';

type ContextProps = {
    userState: null | boolean;
    session: Session | null;
    displayName: string | null;
    setDisplayName: (displayName: string | null) => void;
    userId: string | null;
    setUserId: (user_id: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const AdminContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAdminContext() {
    return useContext(AdminContext);
}


const AdminProvider = (props: Props) => {
    const [ userState, setUserState ] = useState<null | boolean>(null);
    const [ session, setSession ] = useState<Session | null>(null);
    const [ displayName, setDisplayName ] = useState<string | null>(null);
    const [ userId, setUserId ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);


    return (
        <AdminContext.Provider value={{
            userState,
            session,
            displayName,
            setDisplayName,
            userId,
            setUserId,
            loading,
            setLoading
        }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminProvider };