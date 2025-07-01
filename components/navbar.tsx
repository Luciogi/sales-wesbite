import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export function Nav() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F331%2F795%2Fpng-clipart-computer-icons-symbol-random-icons-miscellaneous-angle.png&f=1&nofb=1&ipt=90298e779c5312ed9261168467ddd1e08b5b7353f117d738b7138ad6c14667f3" className="mr-3 h-6 sm:h-9" alt="HourSales Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">HourSales</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="/dashboard">
          Dashboard
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
