import { useRef } from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { supabaseAdmin } from "../initSupabase";


type EmailProps = {
    setUserAction: (userAction: string | null) => void;
};


async function handleUpdateForTable(userId: string, newEmail: string, oldEmail: string, displayName: string) {
    try {
        const updateObject = {
            email_val: newEmail,
            ...(oldEmail === displayName) && { user_name: newEmail },
        };
        const { data, error } = await supabaseAdmin
            .from('user_names')
            .update(updateObject)
            .eq('id', userId)
            .select();
        if (error) return false;
        return (data && data.length > 0) ? true : false;
    } catch (error) {
        return false;
    }
}

export function EmailComponent({ setUserAction }: EmailProps) {
    const { userId, setReadyToClose, ogEmail, displayName } = useAdminContext();
    const inputRefNewEmail = useRef<HTMLInputElement>(null);
    async function handleSubmit(event: any) {
        event.preventDefault();
        const _newEmail = inputRefNewEmail.current?.value;
        if (!_newEmail) return alert("Please enter a new email.");
        if (_newEmail && !_newEmail.includes('@')) return alert("Please enter a valid email.");
        if (_newEmail && _newEmail.length < 6) return alert("Email value must be at least 6 characters long.");
        if (userId) {
            const resVal = await handleUpdateForTable(userId, _newEmail, ogEmail!, displayName!);
            if (!resVal) return alert("There was an error updating your email. Please try again later.")
            const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
                userId, { email: _newEmail }
            );
            if (error) return alert(`There was an error updating your email, ${error.message}`);
            if (user) return setReadyToClose && setReadyToClose(true);
        } else {
            return setUserAction('error');
        }
    }

    return (
        <div>
            <h3><i>Lets change your email</i></h3>
            <div style={{ marginTop: '2rem', border: '2px solid #4E1E66', padding: '1rem', marginBottom: '1rem' }}>
                <form>
                    <label>New Email:</label>{' '}
                    <input ref={inputRefNewEmail} type="email" id="newPassword" minLength={6} required /><br />
                    <small>this is what you use to login</small>
                    <br />
                </form>
            </div>
            <button type="button" onClick={handleSubmit}>submit</button>
            <br />
            <br />
        </div>
    )
}
