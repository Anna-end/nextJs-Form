import Image from "next/image";
import {TokenForm} from "@/components/token/tokenForm"
import {CustomerSearch} from "@/components/order/CustomerSearch"
import {OrderParams} from "@/components/order/OrderParams"
import {ProductSearch} from "@/components/order/ProductSearch"
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-md px-3 pb-44 pt-4 flex flex-col flex-1 gap-2.5 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <TokenForm />
      <CustomerSearch />
      <OrderParams/>
      <ProductSearch/>
    </div>
  );
}
