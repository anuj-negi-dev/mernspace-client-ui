import Link from "next/link";

import Logo from "./Logo";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { CartCounterWithoutSSR } from "./CartCounterWithoutSSR";
import TenantSelect from "./TenantSelect";

async function Header() {
  const tenantsResponse = await fetch(
    `${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );
  if (!tenantsResponse.ok) {
    throw new Error("Failed to fetch tenants");
  }
  const tenants = await tenantsResponse.json();

  return (
    <header className="bg-white">
      <nav className="container py-5 flex items-center justify-around">
        <div className="flex items-center gap-2.5">
          <Logo />
          <TenantSelect tenants={tenants.data} />
        </div>
        <div className="flex items-center gap-4 font-medium">
          <ul className="flex items-center gap-4 font-medium list-none">
            <li>
              <Link className="hover:text-primary duration-200" href={"/"}>
                Menu
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-primary duration-200">
                Orders
              </Link>
            </li>
          </ul>
          <CartCounterWithoutSSR />
          <div className="flex items-center gap-2 ml-4">
            <Phone size={20} />
            <span>+91 12345 67890</span>
          </div>
          <Button size={"sm"}>Logout</Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
