import { useContext, createContext, useState } from 'react';

type ContextProps = {
    displayName: string | null;
    setDisplayName: (displayName: string | null) => void;
    userId: string | null;
    setUserId: (user_id: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    readyToClose: boolean;
    setReadyToClose: (closeIt: boolean) => void;
};

const AdminContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAdminContext() {
    return useContext(AdminContext);
}
const AdminProvider = (props: Props) => {
    const [ displayName, setDisplayName ] = useState<string | null>(null);
    const [ userId, setUserId ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ readyToClose, setReadyToClose ] = useState<boolean>(false);




    return (
        <AdminContext.Provider value={{
            // userState,
            // session,
            displayName,
            setDisplayName,
            userId,
            setUserId,
            loading,
            setLoading,
            readyToClose,
            setReadyToClose
        }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminProvider };