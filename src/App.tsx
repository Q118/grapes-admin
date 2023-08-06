import { useRef, useState, useEffect } from 'react';
import './styles/App.css';
import { useAuthContext } from './AuthProvider';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    useNavigate
} from 'react-router-dom';
import { PrivacyComp } from './Privacy';


let router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/privacypolicy" element={<PrivacyComp />} />
        </>
    )
);

function Home() {
    const { session, displayName, setNewPassword, closeIt, setCloseIt } = useAuthContext();
    const inputRefPassword = useRef<HTMLInputElement>(null);
    const inputRefConfirmPassword = useRef<HTMLInputElement>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ accountUpdate, setAccountUpdate ] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.href.includes('error')) setError(window.location.href.split('error=')[ 1 ]);
        if (window.location.href.includes('token')) setAccountUpdate(true);
    }, [])

    function handleSubmit(event: any) {
        event.preventDefault();
        const _newPassword = inputRefPassword.current?.value;
        const confirmNewPassword = inputRefConfirmPassword.current?.value;
        if (_newPassword !== confirmNewPassword) return alert("Passwords do not match. Please try again.");
        try {
            (setNewPassword && _newPassword) && setNewPassword(_newPassword);
        } catch (error) {
            alert("There was an error updating your password. Try again later.");
        }
        return setCloseIt && setCloseIt(true); // get to hree if no error
    }

    function handleClick() {
        return navigate('/privacypolicy');
    }

    return (
        <>
            <h1>Grapes-App Portal</h1>
            {error ? <div>
                <h2>There was an error updating your account. Please try again later.</h2>
                <h4><i>{error}</i></h4>
                <p>Go Get a new link.</p>
            </div> : (<>
                {closeIt ? (<div>
                    <h2>Update successful. You can now close this window.</h2>
                    <h2>Return to your GRAPES app to login with your new credentials!</h2>
                </div>) : (accountUpdate && <div>
                    {session == null ? <div>Loading...</div> : (<>
                        <h3>Hi {displayName}, let's reset your password.</h3>
                        <div>
                            <label>New Password:</label>{' '}
                            <input ref={inputRefPassword} type="password" id="newPassword" minLength={6} required />
                            <br />
                            <br />
                            <label>Confirm New Password:</label>{' '}
                            <input ref={inputRefConfirmPassword} type="password" id="confirmNewPassword" required />
                            <br />
                            <br />
                            <button type="button" onClick={handleSubmit}>submit</button>
                        </div>
                    </>)}
                </div>)}
                <button onClick={handleClick}>Grapes-App Privacy Policy</button>
            </>)}
        </>
    )
}

if (import.meta.hot) { // this is recommended by react-router to handle hot reloading  
    import.meta.hot.dispose(() => router.dispose());
}


export default function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<>Not Found</>} />
        </>
    );
}