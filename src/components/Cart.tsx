"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  const itemCount = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr- sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">Cart (0)</SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO: Cart logic */}
              Cart Items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span className="">Free</span>
                </div>
              </div>
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span className="">{formatPrice(1)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className=""></div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
