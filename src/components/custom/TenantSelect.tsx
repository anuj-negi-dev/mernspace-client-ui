"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Tenant } from "@/lib/Types";

function TenantSelect({ tenants }: { tenants: Tenant[] }) {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    router.push(`?tenantId=${value}`);
  };

  const searchParams = useSearchParams();

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("tenantId") as string}
    >
      <SelectTrigger className="w-[180px] focus:ring-0 focus:border-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tenants.map((tenant: Tenant) => (
            <SelectItem key={tenant.id} value={String(tenant.id)}>
              {tenant.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default TenantSelect;
