

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminContext } from '../contexts/AdminContext';
import { PasswordComponent } from './Password';
import { PrivacyComp } from './Privacy';
import { ErrorComponent } from './Error';
import { EmailComponent } from './Email';
import { DefaultComponent } from './Default';
import { supabase } from '../initSupabase';
import { CloseComponent } from './CloseComponent';

interface MyMap {
    [ key: string ]: string | undefined
}
/** corresponding map urlval:componentToRender */
const USER_ACTIONS: MyMap = {
    'resetpassword': 'password',
    'emailupdate': 'email',
    'privacypolicy': 'privacy',
    'error': 'error'
}

/**
 * @component Home
 * @description Home page - renders either the password-reset form, 
 * the privacy policy, an error, or the email form
 * based on the params in the url
 * (just simply changing their password can be done inside the app)
 */
export function Home() {
    const { loading, displayName, setLoading, setUserId, setDisplayName, readyToClose } = useAdminContext();
    const [ error, setError ] = useState<string | null>(null);
    const [ userAction, setUserAction ] = useState<string | null>(null);
    // const [ loading, setLoading ] = useState<boolean>(false);
    let location = useLocation();

    // useEffect(() => {
    //     // if (displayName == null) Set
    //     if (displayName && userId) setLoading && setLoading(false);
    //     else setLoading && setLoading(true);

    // }, [ displayName, userId ]);


    useEffect(() => {
        // TODO this in a function then called inside useEffect
        if (window.location.href.includes('error')) {
            setUserAction('error');
            setError(window.location.href.split('error=')[ 1 ]);
        }
        let paramArray = location.search.split('?').filter((param) => param !== '');
        console.log("paramArray: ", paramArray);
        const urlVal = USER_ACTIONS[ paramArray[ 0 ] ] || null;
        const user_id = paramArray[ 1 ]?.split('=')[ 1 ] || null;
        if (user_id) {
            setUserAction(urlVal);
            setUserId && setUserId(user_id);
            handleDisplayName(user_id).then(() => setLoading && setLoading(false));
        }
    }, [ location ])


    async function handleDisplayName(user_id: string) {
        const { data, error } = await supabase
            .from('user_names')
            .select('user_name')
            .eq('id', user_id)
        if (error) {
            setUserAction('error');
            return setError('There was an error fetching your account info. Please try again later. If the problem persists, please contact support at shel.programmer@gmail.com.');
        }
        if (data && data[ 0 ]) {
            setDisplayName && setDisplayName(data[ 0 ].user_name);
            return;
        }
        return setUserAction('error');
    }

    function renderPage() {
        switch (userAction) {
            case 'password': return <PasswordComponent />;
            case 'privacy': return <PrivacyComp />;
            case 'error': return <ErrorComponent errorMessage={error} />;
            case 'email': return <EmailComponent />;
            default: return <DefaultComponent setUserAction={setUserAction} />;
        }
    }

    console.log("userAction: ", userAction)


    return (
        <>
            <h1>Grapes-App Portal</h1>
            {readyToClose ? <CloseComponent /> : (<>
                {loading ? <h2 id="blinking">LOADING . . .</h2> : (<>
                    <h3> Hi {displayName ? displayName : 'Guest'}! </h3>
                    <hr />
                    {renderPage()}
                    {(userAction === 'password' || userAction === 'email' || userAction === 'error') && <>
                        <br />
                        <button onClick={() => setUserAction('privacy')}>Grapes-App Privacy Policy</button>
                    </>}
                </>)}
            </>)}
        </>
    )


}