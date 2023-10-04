import React from "react";
import Logout from "./logout";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { loggedIn, firebaseObserver } from '../config/firebase';
import logo from '../images/MetalMeet.png';

function Header(){
    const [authenticated, setAuthenticated] = useState(loggedIn());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebaseObserver.subscribe('authStateChanged', data => {
            setAuthenticated(data);
            setIsLoading(false);
        });
        return () => { firebaseObserver.unsubscribe('authStateChanged'); }
    }, []);

    return(
        isLoading?<div>Loading</div>:
        <header className="border border-gray-500 bg-gray-200">
            <img src={logo} width="150" height="50" className="inline"/>
            {authenticated?<Logout/>:null}
        </header>
    );
}
export default Header