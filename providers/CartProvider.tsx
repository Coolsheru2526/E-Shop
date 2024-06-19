'use client'

import { CartContextProvider } from "@/hooks/useCart";
import { FC } from "react";

interface CartProviderProps{
    children:React.ReactNode;
}


const CartProvider:FC<CartProviderProps> = ({children}) => {
    return (
        <CartContextProvider>{children}</CartContextProvider>
    );
}

export default CartProvider;