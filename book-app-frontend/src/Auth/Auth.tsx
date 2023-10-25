import { useEffect, useState } from 'react';

import appState from '../AppState' ;


class State {
	isInitialized: boolean = false;

	shallowClone(): State {
		return Object.assign(new State(), this);
	}
}



const Auth: React.FC = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const LogOut = () => {
        appState.userId = "";
        appState.userTitle = "";
        appState.authJwt = "";
        appState.roles = [];
    
        appState.isLoggedIn.value = false;

        localStorage.setItem('userTitle', "");
        localStorage.setItem('roles', "");
        localStorage.setItem('authJwt', "");
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('userId', "");
  
        window.location.href = '/';
        console.log("after log out", appState.isLoggedIn.value);
  
      };
    return(
	<div className="hidden sm:ml-6 sm:flex sm:items-center">
        {!isLoggedIn ? (
                <><a href="/login" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Log in</a>
                <a href="/register" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Register</a></>
              ) : (
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2"
                onClick={LogOut}>Log out</button>
              )}
        
    </div>

	);
}

export default Auth;