// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef, useState } from 'react';
import './App.css';
import { useAuthContext } from './AuthProvider';



function App() {

    const { user, session, displayName, newPassword, setNewPassword } = useAuthContext();
    const inputRefPassword = useRef<HTMLInputElement>(null);
    const inputRefConfirmPassword = useRef<HTMLInputElement>(null);
    const [ closeIt, setCloseIt ] = useState<boolean>(false);


    function handleSubmit(event: any) {
        event.preventDefault();
        const _newPassword = inputRefPassword.current?.value;
        const confirmNewPassword = inputRefConfirmPassword.current?.value;
        console.log(_newPassword, confirmNewPassword)
        // if (_newPassword !== confirmNewPassword) {
        //     alert("Passwords do not match. Please try again.");
        //     return;
        // }
        // try {
        //     (setNewPassword && _newPassword) && setNewPassword(_newPassword);
        // } catch (error) {
        //     alert("There was an error updating your password. Try again later.");
        // }
        // get to hree if no error
        alert("Password updated successfully!");
        return setCloseIt(true);
    }

    return (
        <>
            {closeIt ? (
                <div>
                    <h2>You can now close this window.</h2>
                    <h2>Return to your GRAPES app to login with your new credentials!</h2>
                </div>
            ) : (


                <div>
                    <h1>Change GRAPES Password</h1>
                    {/* {session == null ? <div>Loading...</div> : ( */}
                    <>
                        <h3>Hi {displayName}, let's reset your password.</h3>
                        <div>
                            <label>New Password:</label>{' '}
                            <input ref={inputRefPassword} type="password" id="newPassword" maxLength={6} required />
                            <br />
                            <br />
                            <label>Confirm New Password:</label>{' '}
                            <input ref={inputRefConfirmPassword} type="password" id="confirmNewPassword" required />
                            <br />
                            <br />
                            <button type="button" onClick={handleSubmit}>submit</button>
                        </div>
                    </>
                    {/* )} */}


                </div>
            )}
        </>
    )
}

export default App
