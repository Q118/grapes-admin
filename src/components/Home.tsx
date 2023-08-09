

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminContext } from '../contexts/AdminContext';
import { PasswordComponent } from './Password';
import { PrivacyComp } from './Privacy';
import { ErrorComponent } from './Error';
import { EmailComponent } from './Email';
import { DefaultComponent } from './Default';

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
    const { userState, session, displayName, setDisplayName, userId, setUserId } = useAdminContext();
    const [ error, setError ] = useState<string | null>(null);
    const [ userAction, setUserAction ] = useState<string | null>(null);
    // const [ loading, setLoading ] = useState<boolean>(false);
    let location = useLocation();

    useEffect(() => {
        // TODO this in a function then called inside useEffect
        if (window.location.href.includes('error')) {
            setUserAction('error');
            setError(window.location.href.split('error=')[ 1 ]);
        }
        // console.log("location: ", location);
        let paramArray = location.search.split('?').filter((param) => param !== '');
        //  ['resetpassword', 'id=2']
        console.log("paramArray: ", paramArray);
        const urlVal = USER_ACTIONS[ paramArray[ 0 ] ] || null;
        const user_id = paramArray[ 1 ]?.split('=')[ 1 ] || null;
        setUserAction(urlVal);
        // console.log("urlVal: ", urlVal);
        setUserId && setUserId(user_id);
    }, [ location ])

    function renderPage() {
        switch (userAction) {
            case 'password':
                return <PasswordComponent />;
            case 'privacy':
                return <PrivacyComp />;
            case 'error':
                return <ErrorComponent errorMessage={error} />;
            case 'email':
                return <EmailComponent />;
            default: return <DefaultComponent setUserAction={setUserAction} />
        }
    }


    return (
        <>
            <h1>Grapes-App Portal</h1>
            <h3>Hi {displayName || 'Guest'}!</h3>
            {renderPage()}
        </>
    )


}