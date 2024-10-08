import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

function NavItem({ label, path }) {
  return (
    <Link to={path}>
      <Typography as="li" color="blue-gray" className="p-1 font-medium">
        {label}
      </Typography>
    </Link>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <NavItem label="About Us" path="/about-us" />
      <NavItem label="Pricing" path="/pricing" />
      <NavItem label="Contact Us" path="/contact-us" />
    </ul>
  );
}

export function NavbarMenu() {
  const { isAuthenticated, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen((cur) => !cur);
  const toggleDropdown = () => setDropdownOpen((cur) => !cur);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            color="blue-gray"
            className="mr-4 cursor-pointer text-lg font-bold"
          >
            AlloMedia Delivery
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <div className="relative inline-block text-left">
                <img
                  id="avatarButton"
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src="/docs/images/people/profile-picture-5.jpg"
                  alt="User dropdown"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <div className="capitalize font-bold">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link to="/profile">
                          <a className="block px-4 py-2 hover:bg-gray-100">
                            Profile
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button 
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color="gray" className="hidden lg:inline-block">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button color="green" className="hidden lg:inline-block">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="mt-2 rounded-xl bg-white py-2">
          <NavList />
          {isAuthenticated ? (
            <button onClick={handleLogout} className="mb-2 w-full">
              <Button className="mb-2" fullWidth>
                Sign out
              </Button>
            </button>
          ) : (
            <>
              <Link to="/login">
                <Button className="mb-2" fullWidth>
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="mb-2" color="green" fullWidth>
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarMenu;