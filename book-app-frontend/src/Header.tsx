import React, { useState } from "react";
import appState from "./AppState";
import Auth from "./Auth/Auth";
import BooksSvg from "./svg/BooksSvg";

const Header: React.FC = () => {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
	const [isMenuHidden, setIsMenuHidden] = useState(true);

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
  
        window.location.href = '/';
        console.log("after log out", appState.isLoggedIn.value);
  
      };

  return (
    <nav className="bg-white shadow">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 justify-between">
      <div className="flex">
        <div className="flex flex-shrink-0 items-center">
		<BooksSvg className="blinking-icon" />
        
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="/" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Books</a>
          <a href="/authors-list" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Authors</a>

        </div>
      </div>
	  <div className="hidden sm:ml-6 sm:flex sm:items-center">
        {!isLoggedIn ? (
                <><a href="/login" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Log in</a>
                <a href="/register" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Register</a></>
              ) : (
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2"
                onClick={LogOut}>Log out</button>
              )}
        
    </div>

      <div className="-mr-2 flex items-center sm:hidden">
        {/* <!-- Mobile menu button --> */}
        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu"
			aria-expanded={isMenuHidden}
			onClick={() => setIsMenuHidden(!isMenuHidden)}
			>
          <span className="sr-only">Open main menu</span>
          {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/bars-3

            Menu open: "hidden", Menu closed: "block"
          --> */}
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          --> */}
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* <!-- Mobile menu, show/hide based on menu state. --> */}
  <div className="sm:hidden" id="mobile-menu" hidden={isMenuHidden}>
    <div className="space-y-1 pt-2 pb-3">
      <a href="/" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Books</a>
      <a href="/authors-list" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Authors</a>

      <Auth />
    </div>
    <div className="border-t border-gray-200 pt-4 pb-3">
	{!isLoggedIn ? (
                <><a href="/login" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Log in</a>
                <a href="/register" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Register</a></>
              ) : (
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2"
                onClick={LogOut}>Log out</button>
              )}
    </div>
  </div>
</nav>
  );
};

export default Header;

