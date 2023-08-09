// import { useRef, useState, useEffect } from 'react';
import './styles/App.css';
// import { useAuthContext } from './AuthProvider';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
// import { PrivacyComp } from './Privacy';
import { Home } from './components/Home';
const Noop: JSX.Element = <><h2>404 Not Found</h2><a href="/">go back</a></>;

// * we WILL get the user id from the url param this time.

// https://q118.github.io/grapes_mobile/
// allow us to use methods like useNavigate() and useLocation()
let router = createBrowserRouter( 
    createRoutesFromElements(<Route path="/" element={<Home />} errorElement={Noop} />)
);


if (import.meta.hot) { // this is recommended by react-router to handle hot reloading  
    import.meta.hot.dispose(() => router.dispose());
}


export default function App() {
    return (<RouterProvider router={router} fallbackElement={<>Not Found</>} />);
}