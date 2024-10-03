import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

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
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
