import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Logo from "./Logo";

function Header() {
  return (
    <header className="bg-white">
      <nav className="container py-5">
        <div className="flex items-center gap-2.5">
          <Logo />
          <Select>
            <SelectTrigger className="w-[180px] ring-0 border-0 focus:ring-0 focus:border-0">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
                <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
                <SelectItem value="kids-corner">Kids Corner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
