import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const currentPath = location.pathname;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-[5000] px-8 py-4 backdrop-blur-md bg-white/30 border-b border-white/30 shadow-md flex justify-between items-center transition-all duration-300">
      <h1 className="text-lg font-bold">CODORA</h1>

      {/* Nav Links */}
      <ul className="flex gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <li key={link.path} className="relative group">
              <Link
                to={link.path}
                className={`cursor-pointer px-1 ${
                  isActive ? "text-black underline underline-offset-4 decoration-[2px]" : "text-gray-800"
                }`}
              >
                {link.label}
              </Link>

              {/* Animated underline */}
              {!isActive && (
                <span
                  className="absolute bottom-0 left-0 top-5 w-full h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left "
                ></span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Auth Buttons */}
      {token ? (
        <div className="flex items-center gap-3">
          <button 
            className="relative overflow-hidden border border-black px-4 py-2 rounded-full text-sm font-medium text-black group"
            onClick={() => {
              dispatch(setCredentials({ token: null, role: null }));
              navigate('/login');
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Log Out
            </span>
            <span className="absolute inset-0 bg-black w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full z-0" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Log In Button */}
          <button 
            className="relative overflow-hidden border border-black px-4 py-2 rounded-full text-sm font-medium text-black group"
            onClick={() => navigate('/login')}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Log In
            </span>
            <span className="absolute inset-0 bg-black w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full z-0" />
          </button>

          {/* Sign Up Button */}
          <button 
            className="relative overflow-hidden border border-black px-4 py-2 rounded-full text-sm font-medium text-black group"
            onClick={() => navigate('/register')}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Sign Up
            </span>
            <span className="absolute inset-0 bg-black w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full z-0" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
