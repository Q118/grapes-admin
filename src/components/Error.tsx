// import { useState, useRef } from "react";


type ErrorProps = {
    errorMessage: string | null;
}

const UNKNOWN_ERROR = "An unknown error occurred. Please try again later. If the problem persists, please contact support at shel.programmer@gmail.com"

export function ErrorComponent({ errorMessage }: ErrorProps) {


    return (
        <div>
        <h2>There was an error processing your request. Please try again later.</h2>
        <h4><i>{errorMessage ? errorMessage : UNKNOWN_ERROR}</i></h4>
        <a href="/">go back</a>
    </div>
    )
}
