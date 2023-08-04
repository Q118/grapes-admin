import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from './initSupabase';
import { Session } from '@supabase/supabase-js';



type ContextProps = {
    user: null | boolean;
    session: Session | null;
    displayName: string | null;
    newPassword: string | null;
    setNewPassword: (newPassword: string | null) => void;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAuthContext() {
    return useContext(AuthContext);
}


/** helpers */
const getDisplayName = async (user_id: string): Promise<string | null> => {
    const { data, error } = await supabase
        .from('user_names').select('user_name')
        .eq('id', user_id).single();
    //* okay to use single bc each col is unique
    if (error) return null;
    return data?.user_name || null;
};



const AuthProvider = (props: Props) => {
    const [ user, setUser ] = useState<null | boolean>(null);
    const [ session, setSession ] = useState<Session | null>(null);
    const [ displayName, setDisplayName ] = useState<string | null>(null);
    const [ newPassword, setNewPassword ] = useState<string | null>(null);

    useEffect(() => {
        if (newPassword) {
            supabase.auth.updateUser({ password: newPassword }).then((data) => {
                if (data) alert("Password updated successfully!")
            }).catch((error) => {
                if (error) alert("There was an error updating your password. Try again later.")
            })
        }
    }, [ newPassword ])

    /**
     * Once the user is redirected back to your application,
     * ask the user to reset their password.
     */
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                console.log("PASSWORD_RECOVERY event");
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session ? true : false);
                if (session) handleSessionUser(session);
            }
            if (event == "USER_UPDATED") {
                console.log("USER_UPDATED event");
            }
        })
    }, [])

    useEffect(() => {
        setUser(session ? true : false);
        if (session) handleSessionUser(session);
    }, [ user ]);

    function handleSessionUser(session: Session | null) {
        if (!session) {
            setDisplayName(null);
        } else {
            const { user } = session;
            if (user) {
                getDisplayName(user.id).then((name) => {
                    setDisplayName(name);
                });
            }
        }
    };


    return (
        <AuthContext.Provider value={{ user, session, displayName, newPassword, setNewPassword }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
