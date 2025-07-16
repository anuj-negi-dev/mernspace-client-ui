import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Logo from "./Logo";
import { Phone, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { Tenant } from "@/lib/Types";

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
          <Select>
            <SelectTrigger className="w-[180px] focus:ring-0 focus:border-0">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tenants.data.map((tenant: Tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <div className="relative ml-4">
            <Link href={"/cart"}>
              <ShoppingBasket className="hover:text-primary duration-200" />
              <span className="absolute -top-5 -right-2  h-6 w-6 rounded-full bg-primary font-bold flex justify-center text-white">
                3
              </span>
            </Link>
          </div>
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
