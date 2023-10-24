import React, { useState } from "react";
import appState from "./AppState";
import Auth from "./Auth/Auth";

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
        <svg fill="#000000" height="48px" width="48px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511 511" xmlSpace="preserve">
                        <g>
	<path d="M487.5,128.106H479v-24.5c0-2.905-1.678-5.549-4.307-6.786C405.088,64.066,325.408,63.6,255.5,95.371
		C185.592,63.6,105.912,64.067,36.307,96.82C33.678,98.057,32,100.701,32,103.606v24.5h-8.5c-12.958,0-23.5,10.542-23.5,23.5v264
		c0,12.958,10.542,23.5,23.5,23.5h464c12.958,0,23.5-10.542,23.5-23.5v-264C511,138.648,500.458,128.106,487.5,128.106z
		 M263,239.583c0-0.009,0-0.019,0-0.028V108.416c64.137-28.707,136.861-28.707,201,0v27.161c0,0.01-0.001,0.02-0.001,0.029
		s0.001,0.02,0.001,0.029v244.438c-32.237-13.461-66.371-20.193-100.5-20.193c-34.129,0-68.264,6.732-100.5,20.193V239.583z
		 M215,96.391c11.187,3.204,22.217,7.198,33,12.025v117.177l-12.34-8.227c-2.52-1.68-5.801-1.68-8.32,0L215,225.593V96.391z
		 M47,135.626c0-0.007,0.001-0.013,0.001-0.02S47,135.594,47,135.587v-27.171c48.563-21.736,102.046-26.999,153-15.82v32.856
		c-26.767-5.505-54.078-6.777-81.328-3.75c-4.117,0.457-7.083,4.165-6.626,8.282c0.458,4.116,4.162,7.085,8.282,6.626
		c26.708-2.967,53.479-1.562,79.671,4.165v48.686c-15.912-3.265-32.14-5.067-48.377-5.323c-4.145-0.078-7.552,3.239-7.618,7.38
		c-0.065,4.142,3.239,7.552,7.38,7.618c16.331,0.258,32.654,2.164,48.614,5.647v16.66c-43.389-8.909-88.39-6.644-130.748,6.665
		c-3.952,1.241-6.148,5.451-4.907,9.403c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347
		c40.908-12.852,84.428-14.773,126.252-5.638v2.825c0,2.766,1.522,5.308,3.961,6.612c2.438,1.306,5.398,1.162,7.699-0.372
		l19.84-13.227l16.5,11v136.454c-32.237-13.461-66.371-20.193-100.5-20.193c-34.129,0-68.264,6.732-100.5,20.193V135.626z
		 M224,424.106H23.5c-4.687,0-8.5-3.813-8.5-8.5v-264c0-4.687,3.813-8.5,8.5-8.5H32v248.5v8c0,4.142,3.358,7.5,7.5,7.5H224V424.106z
		 M57.29,392.106c58.099-22.934,122.32-22.935,180.42,0H57.29z M272,424.106h-33v-17h33V424.106z M453.71,392.106H273.29
		C331.389,369.172,395.61,369.172,453.71,392.106z M496,415.606c0,4.687-3.813,8.5-8.5,8.5H287v-17h184.5c4.142,0,7.5-3.358,7.5-7.5
		v-8v-248.5h8.5c4.687,0,8.5,3.813,8.5,8.5V415.606z"/>
	<path d="M309.96,317.749c-8.302,1.74-16.615,3.911-24.708,6.454c-3.952,1.242-6.148,5.452-4.907,9.403
		c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347c7.628-2.396,15.464-4.443,23.288-6.083
		c4.054-0.85,6.652-4.825,5.802-8.879C317.989,319.497,314.011,316.9,309.96,317.749z"/>
	<path d="M439.502,338.859c3.189,0,6.147-2.051,7.153-5.254c1.241-3.952-0.956-8.162-4.907-9.403
		c-32.073-10.076-65.329-13.842-98.844-11.188c-4.129,0.326-7.211,3.938-6.885,8.068s3.935,7.213,8.068,6.885
		c31.59-2.499,62.935,1.048,93.165,10.546C438,338.748,438.757,338.859,439.502,338.859z"/>
	<path d="M287.498,306.767c0.745,0,1.502-0.112,2.25-0.347c48.249-15.159,99.256-15.159,147.504,0
		c3.952,1.24,8.162-0.956,9.403-4.907c1.241-3.952-0.956-8.162-4.907-9.403c-51.191-16.083-105.306-16.083-156.496,0
		c-3.952,1.241-6.149,5.451-4.907,9.403C281.352,304.716,284.309,306.767,287.498,306.767z"/>
	<path d="M287.498,274.859c0.745,0,1.502-0.112,2.25-0.347c27.681-8.697,56.409-12.412,85.399-11.037
		c4.147,0.192,7.651-2.999,7.847-7.137c0.196-4.138-2.999-7.65-7.137-7.847c-30.753-1.456-61.236,2.483-90.605,11.71
		c-3.952,1.242-6.149,5.452-4.907,9.403C281.352,272.81,284.309,274.859,287.498,274.859z"/>
	<path d="M441.748,260.202c-10.76-3.38-21.846-6.086-32.952-8.043c-4.08-0.719-7.968,2.006-8.688,6.085
		c-0.719,4.079,2.005,7.969,6.085,8.688c10.467,1.844,20.917,4.395,31.058,7.581c0.749,0.235,1.505,0.347,2.25,0.347
		c3.189,0,6.147-2.051,7.153-5.254C447.896,265.653,445.7,261.443,441.748,260.202z"/>
	<path d="M287.498,242.767c0.745,0,1.502-0.112,2.25-0.347c48.249-15.159,99.256-15.159,147.504,0
		c3.952,1.24,8.162-0.956,9.403-4.907c1.241-3.952-0.956-8.162-4.907-9.403c-51.191-16.083-105.306-16.083-156.496,0
		c-3.952,1.241-6.149,5.451-4.907,9.403C281.352,240.716,284.309,242.767,287.498,242.767z"/>
	<path d="M334.678,185.702c-16.732,1.858-33.362,5.36-49.426,10.407c-3.952,1.241-6.148,5.451-4.907,9.403
		c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347c15.141-4.757,30.815-8.057,46.585-9.809
		c4.117-0.457,7.083-4.165,6.626-8.282S338.79,185.244,334.678,185.702z"/>
	<path d="M367.386,199.137c23.725,0.375,47.231,4.17,69.866,11.283c0.748,0.234,1.505,0.347,2.25,0.347
		c3.189,0,6.146-2.051,7.153-5.254c1.241-3.952-0.956-8.162-4.907-9.403c-24.015-7.545-48.955-11.572-74.125-11.97
		c-4.125-0.078-7.552,3.239-7.618,7.38S363.244,199.072,367.386,199.137z"/>
	<path d="M390.671,168.704c4.116,0.46,7.825-2.509,8.282-6.626c0.458-4.117-2.509-7.825-6.626-8.282
		c-36.252-4.027-72.278-0.526-107.075,10.406c-3.952,1.242-6.148,5.452-4.907,9.403c1.007,3.204,3.964,5.254,7.153,5.254
		c0.745,0,1.502-0.112,2.25-0.347C322.545,168.208,356.5,164.909,390.671,168.704z"/>
	<path d="M441.748,164.202c-5.418-1.702-10.96-3.246-16.472-4.588c-4.03-0.98-8.082,1.488-9.062,5.512
		c-0.98,4.024,1.488,8.082,5.512,9.062c5.196,1.265,10.419,2.72,15.526,4.324c0.748,0.235,1.505,0.347,2.25,0.347
		c3.189,0,6.147-2.051,7.153-5.254C447.896,169.653,445.7,165.443,441.748,164.202z"/>
	<path d="M287.498,146.767c0.745,0,1.502-0.112,2.25-0.347c5.103-1.604,10.325-3.058,15.521-4.324
		c4.024-0.98,6.492-5.037,5.512-9.062s-5.038-6.492-9.062-5.512c-5.513,1.342-11.053,2.886-16.468,4.587
		c-3.951,1.242-6.148,5.452-4.907,9.403C281.352,144.716,284.309,146.767,287.498,146.767z"/>
	<path d="M336.329,136.611c34.172-3.796,68.126-0.496,100.923,9.809c0.748,0.234,1.505,0.347,2.25,0.347
		c3.189,0,6.146-2.051,7.153-5.254c1.241-3.952-0.956-8.162-4.907-9.403c-34.797-10.933-70.824-14.435-107.076-10.406
		c-4.117,0.457-7.083,4.165-6.626,8.282C328.504,134.102,332.21,137.07,336.329,136.611z"/>
	<path d="M93.96,317.749c-8.302,1.74-16.615,3.911-24.708,6.454c-3.952,1.242-6.148,5.452-4.907,9.403
		c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347c7.628-2.396,15.464-4.443,23.288-6.083
		c4.054-0.85,6.652-4.825,5.802-8.879S98.011,316.9,93.96,317.749z"/>
	<path d="M223.502,338.859c3.189,0,6.147-2.051,7.153-5.254c1.241-3.952-0.956-8.162-4.907-9.403
		c-32.073-10.076-65.331-13.842-98.844-11.188c-4.129,0.326-7.211,3.938-6.885,8.068s3.934,7.213,8.068,6.885
		c31.591-2.499,62.935,1.048,93.165,10.546C222,338.748,222.757,338.859,223.502,338.859z"/>
	<path d="M71.498,306.767c0.745,0,1.502-0.112,2.25-0.347c48.249-15.159,99.256-15.159,147.504,0
		c3.952,1.24,8.162-0.956,9.403-4.907c1.241-3.952-0.956-8.162-4.907-9.403c-51.191-16.083-105.307-16.083-156.496,0
		c-3.952,1.241-6.149,5.451-4.907,9.403C65.352,304.716,68.309,306.767,71.498,306.767z"/>
	<path d="M71.498,274.859c0.745,0,1.502-0.112,2.25-0.347c27.681-8.697,56.411-12.412,85.399-11.037
		c4.158,0.192,7.65-2.999,7.847-7.137c0.196-4.138-2.999-7.65-7.137-7.847c-30.756-1.456-61.236,2.483-90.605,11.71
		c-3.952,1.242-6.149,5.452-4.907,9.403C65.352,272.81,68.309,274.859,71.498,274.859z"/>
	<path d="M190.194,266.932c10.467,1.844,20.917,4.395,31.058,7.581c0.749,0.235,1.505,0.347,2.25,0.347
		c3.189,0,6.147-2.051,7.153-5.254c1.241-3.952-0.956-8.162-4.907-9.403c-10.76-3.38-21.846-6.086-32.952-8.043
		c-4.079-0.719-7.969,2.006-8.688,6.085C183.39,262.323,186.114,266.213,190.194,266.932z"/>
	<path d="M118.678,185.702c-16.732,1.858-33.362,5.36-49.426,10.407c-3.952,1.241-6.148,5.451-4.907,9.403
		c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347c15.141-4.757,30.815-8.057,46.585-9.809
		c4.117-0.457,7.083-4.165,6.626-8.282C126.503,188.212,122.788,185.244,118.678,185.702z"/>
	<path d="M64.345,173.605c1.007,3.204,3.964,5.254,7.153,5.254c0.745,0,1.502-0.112,2.25-0.347
		c32.797-10.305,66.752-13.604,100.923-9.809c4.116,0.46,7.825-2.509,8.282-6.626c0.458-4.117-2.509-7.825-6.626-8.282
		c-36.253-4.027-72.278-0.526-107.075,10.406C65.3,165.444,63.104,169.654,64.345,173.605z"/>
	<path d="M71.498,146.767c0.745,0,1.502-0.112,2.25-0.347c5.103-1.604,10.325-3.058,15.521-4.324
		c4.024-0.98,6.492-5.037,5.512-9.062s-5.038-6.492-9.062-5.512c-5.513,1.342-11.053,2.886-16.468,4.587
		c-3.951,1.242-6.148,5.452-4.907,9.403C65.352,144.716,68.309,146.767,71.498,146.767z"/>
</g>
                        </svg>
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
