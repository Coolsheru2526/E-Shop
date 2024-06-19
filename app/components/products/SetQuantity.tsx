'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { FC } from "react";

interface SetQtyProps{
    cartCounter?:boolean;
    cardProduct: CartProductType;
    handleQtyIncrease:()=>void;
    handleQtyDecrease:()=>void;
}

const btnStyles = `border-[1.2px] border-slate-300 px-2 rounded`;

const SetQuantity:FC<SetQtyProps> =({
    cartCounter,
    cardProduct,
    handleQtyIncrease,
    handleQtyDecrease
})=>{
    return(
        <div className="flex gap-8 items-center">
            {cartCounter ? null: <div className="font-semibold">QUANTITY:</div>}
            <div className="flex gap-2 items-center text-base">
                <button onClick={handleQtyDecrease} className={btnStyles}>-</button>
                <div>{cardProduct.quantity}</div>
                <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
            </div> 
        </div>
    )
}
export default SetQuantity;