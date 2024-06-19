import { FC } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: FC<ItemContentProps> = ({ item }) => {
    const {handleRemoveProductFromCart,handleCartQtyIncrease,handleCartQtyDecrease,handleClearCart}=useCart();
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-16 h-16">
                        <Image 
                            src={item.selectedImg.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        {truncateText(item.name)}
                    </Link>
                    <button className="text-slate-500 underline" onClick={() => {handleRemoveProductFromCart(item)}}>
                        Remove
                    </button>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cardProduct={item}
                    handleQtyIncrease={() => {handleCartQtyIncrease(item)}}
                    handleQtyDecrease={() => {handleCartQtyDecrease(item)}}
                />
            </div>
            <div className="justify-self-center font-semibold">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;
