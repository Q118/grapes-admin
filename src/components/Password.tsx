import { useRef } from "react";
import { supabaseAdmin } from "../initSupabase";
import { useAdminContext } from "../contexts/AdminContext";
import { default_error } from "../constants";



export function PasswordComponent() {
    const { userId, setReadyToClose } = useAdminContext();
    const inputRefPassword = useRef<HTMLInputElement>(null);
    const inputRefConfirmPassword = useRef<HTMLInputElement>(null);


    async function handleSubmit(event: any) {
        event.preventDefault();
        const _newPassword = inputRefPassword.current?.value;
        const confirmNewPassword = inputRefConfirmPassword.current?.value;
        if (!_newPassword) return alert("Please enter a new password.");
        if (_newPassword && _newPassword.length < 6) return alert("Password must be at least 6 characters long.");
        if (_newPassword !== confirmNewPassword) return alert("Passwords do not match. Please try again.");
        if (userId) {
            const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
                userId, { password: _newPassword }
            )
            if (error) {
                return alert(default_error);
            }
            if (user) {
                return setReadyToClose && setReadyToClose(true);
            }
        } else {
            return alert(default_error);
        }
    }

    return (
        <div>
            <h3><i>Lets reset your password</i></h3>
            <div style={{ marginTop: '2rem', border: '2px solid #4E1E66', padding: '1rem', marginBottom: '1rem' }}>
                <form>
                    <label>New Password:</label>{' '}
                    <input
                        ref={inputRefPassword} type="password" id="newPassword"
                        minLength={6} required />
                    <br />
                    <br />
                    <label>Confirm New Password:</label>{' '}
                    <input ref={inputRefConfirmPassword} type="password" id="confirmNewPassword" required />
                    <br />
                    <br />
                </form>
            </div>
            <button type="button" onClick={handleSubmit}>submit</button>
        </div>
    )
}
