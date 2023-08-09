import { useState, useRef } from "react";


export function EmailComponent() {
    // const { closeIt, setCloseIt } = useAuthContext();
    // const inputRefPassword = useRef<HTMLInputElement>(null);
    // const inputRefConfirmPassword = useRef<HTMLInputElement>(null);
    const inputRefPassword = useRef<HTMLInputElement>(null);
    const inputRefConfirmPassword = useRef<HTMLInputElement>(null);

    // const [ newPassword, setNewPassword] = useState<string | null>(null);
    
    function handleSubmit(event: any) {
        event.preventDefault();
        // const _newPassword = inputRefPassword.current?.value;
        // const confirmNewPassword = inputRefConfirmPassword.current?.value;
        // if (_newPassword !== confirmNewPassword) return alert("Passwords do not match. Please try again.");
        // try {
        //     (setNewPassword && _newPassword) && setNewPassword(_newPassword);
        // } catch (error) {
        //     alert("There was an error updating your password. Try again later.");
        // }
        // return setCloseIt && setCloseIt(true); // get to hree if no error
    }

    return (
        <div>
            <h3><i>Lets reset your email</i></h3>
            <div style={{
                marginTop: '2rem',
                border: '2px solid #4E1E66',
                padding: '1rem',
                marginBottom: '1rem'
            }}>
                <label>New Password:</label>{' '}
                <input ref={inputRefPassword} type="password" id="newPassword" minLength={6} required />
                <br />
                <br />
                <label>Confirm New Password:</label>{' '}
                <input ref={inputRefConfirmPassword} type="password" id="confirmNewPassword" required />
                <br />
                <br />
            </div>
            <button type="button" onClick={handleSubmit}>submit</button>
    </div>
    )
}
