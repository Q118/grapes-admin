// import { useState, useRef } from "react";


type ErrorProps = {
    errorMessage: string | null;
}

export function ErrorComponent({ errorMessage }: ErrorProps) {
    // const { closeIt, setCloseIt } = useAuthContext();
    // const inputRefPassword = useRef<HTMLInputElement>(null);
    // const inputRefConfirmPassword = useRef<HTMLInputElement>(null);

    // const [ newPassword, setNewPassword] = useState<string | null>(null);
    
    // function handleSubmit(event: any) {
    //     event.preventDefault();
    //     const _newPassword = inputRefPassword.current?.value;
    //     const confirmNewPassword = inputRefConfirmPassword.current?.value;
    //     if (_newPassword !== confirmNewPassword) return alert("Passwords do not match. Please try again.");
    //     try {
    //         (setNewPassword && _newPassword) && setNewPassword(_newPassword);
    //     } catch (error) {
    //         alert("There was an error updating your password. Try again later.");
    //     }
    //     return setCloseIt && setCloseIt(true); // get to hree if no error
    // }

    return (
        <div>
        <h2>There was an error processing your request. Please try again later.</h2>
        <h4><i>{errorMessage}</i></h4>
        {/* <p>Go Get a new link.</p> */}
        <a href="/">go back</a>
    </div>
    )
}
