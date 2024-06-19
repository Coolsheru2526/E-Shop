'use client'

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps{
    clientSecret:string,
    handleSetPaymentSuccess:(value:boolean)=>void
}

const CheckoutForm:FC<CheckoutFormProps> = ({clientSecret,handleSetPaymentSuccess}) => {

    const {cartTotalAmount,handleClearCart,handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading,setIsLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotalAmount);
    
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        if(!stripe||!elements){
            return
        }
        setIsLoading(true);
        stripe.confirmPayment({
            elements,redirect:'if_required'
        }).then((result)=>{
            if(!result.error){
                toast.success('Checkout Successful');
                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }
            setIsLoading(false);
        })
    }
    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div>
                <Heading title="Enter Your Details to Complete Checkout"/>
                <h2 className="font-semibold-">Address Information</h2>
                <AddressElement id="payment-element" options={
                    {
                        mode:"shipping",
                        allowedCountries:['CA',
                            'NZ',
                            'US', 
                            "US",
                            "AE",
                            "AG",
                            "AL",
                            "AM",
                            "AR",
                            "AT",
                            "AU",
                            "BA",
                            "BE",
                            "BG",
                            "BH",
                            "BO",
                            "CA",
                            "CH",
                            "CI",
                            "CL",
                            "CO",
                            "CR"]
                    }
                }/>
            </div>
            <h2 className="font-semibold mt-4 mb-2">Information</h2>
            <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total:{formattedPrice}
            </div>
            <Button label={isLoading ? 'Processing': "Pay Now"}
            disabled={isLoading||!stripe||!elements}
            onClick={()=>{}}/>
        </form>
    );
}

export default CheckoutForm;