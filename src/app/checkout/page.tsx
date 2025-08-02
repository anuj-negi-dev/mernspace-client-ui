import { getSession } from "@/lib/getsession";
import { redirect } from "next/navigation";
import CustomerForm from "./components/CustomerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: {
    tenantId: string;
  };
}) {
  const session = await getSession();

  if (!session) {
    redirect(
      `/login?tenantId=${
        searchParams.tenantId
      }&redirect=${`/checkout/?tenantId=${searchParams.tenantId}`}`
    );
  }

  return <CustomerForm />;
}
