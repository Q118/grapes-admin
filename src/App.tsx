// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef, useState } from 'react';
import './App.css';
import { useAuthContext } from './AuthProvider';



function App() {
    const { session, displayName, setNewPassword } = useAuthContext();
    const inputRefPassword = useRef<HTMLInputElement>(null);
    const inputRefConfirmPassword = useRef<HTMLInputElement>(null);
    const [ closeIt, setCloseIt ] = useState<boolean>(false);

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
        return setCloseIt(true); // get to hree if no error
    }

    return (
        <>
            {closeIt ? (<div>
                <h2>Password Update successful. You can now close this window.</h2>
                <h2>Return to your GRAPES app to login with your new credentials!</h2>
            </div>) : (<div>
                <h1>Change GRAPES Password</h1>
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
        </>
    )
}

export default App;
