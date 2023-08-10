import { useEffect, useState } from 'react';
import { useAdminContext } from '../contexts/AdminContext';
import { PasswordComponent } from './Password';
import { PrivacyComp } from './Privacy';
import { ErrorComponent } from './Error';
import { EmailComponent } from './Email';
import { DefaultComponent } from './Default';
import { supabase } from '../initSupabase';
import { CloseComponent } from './CloseComponent';
import { request_error } from '../constants';

interface MyMap { [ key: string ]: string | undefined }
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
    const { loading, displayName, setLoading, setUserId, setDisplayName, readyToClose, setOgEmail } = useAdminContext();
    const [ error, setError ] = useState<string | null>(null);
    const [ userAction, setUserAction ] = useState<string | null>(null);

    useEffect(() => { setUpHome(); }, [ window.location.href ])

    function setUpHome() {
        if (window.location.href.includes('error')) {
            setUserAction('error');
            setError(window.location.href.split('error=')[ 1 ]);
        }
        let paramArray = window.location.href.split('?').filter((param) => param !== '');
        console.log(paramArray)
        const urlVal = USER_ACTIONS[ paramArray[ 1 ] ] || null;
        const user_id = paramArray[ 2 ]?.split('=')[ 1 ] || null;
        if (urlVal === 'privacy') {
            setUserAction(urlVal);
            return setLoading && setLoading(false);
        }
        if ((user_id && user_id.length > 0)) {
            setUserAction(urlVal);
            setUserId && setUserId(user_id);
            handleDisplayName(user_id).then(() => setLoading && setLoading(false));
        } else setLoading && setLoading(false);
        // else it's just the default page
    }

    async function handleDisplayName(user_id: string) {
        const { data, error } = await supabase
            .from('user_names')
            .select('user_name, email_val')
            .eq('id', user_id)
        if (error) {
            setUserAction('error');
            return setError(request_error);
        }
        if (data && data[ 0 ]) {
            setDisplayName && setDisplayName(data[ 0 ].user_name);
            setOgEmail && setOgEmail(data[ 0 ].email_val);
            return;
        }
        return setUserAction('error');
    }

    function renderPage() {
        switch (userAction) {
            case 'password': return <PasswordComponent />;
            case 'privacy': return <PrivacyComp />;
            case 'error': return <ErrorComponent errorMessage={error} />;
            case 'email': return <EmailComponent setUserAction={setUserAction} />;
            default: return <DefaultComponent setUserAction={setUserAction} />;
        }
    }

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