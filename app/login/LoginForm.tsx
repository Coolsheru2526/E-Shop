'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaferUser } from "@/types";

interface LoginFormProps{
    currentUser:SaferUser|null;
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
    const router =useRouter();
    useEffect(()=>{
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    },[])
    const [isLoading,setIsLoading]=useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm<FieldValues>({
        defaultValues:{
            email:"",
            password:""
        }
    });
    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect:false
        }).then((callback)=>{
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Logged In", { id: "success" });
                router.push('/cart');
                router.refresh();
            }
            if (callback?.error) {
                toast.error(callback.error, { id: "error" });
            }
        })
    };
    if(currentUser){
        return <p className="text-center">
            Logged In, Redirecting...
        </p>
    }
    return (
        <>
            <Heading title="Sign In to E-Shop"/>
            <Button
            outline
            label="Continue with Google"
            icon={AiOutlineGoogle}
            onClick={()=>{signIn('google')}}/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
            />
            <Button label={isLoading ? "Loading" : "Login"} onClick={
                handleSubmit(onSubmit)
            }/>
            <p className="text-sm">
                Do not have an account?
                <Link className="underline" href='/register'>
                    Register
                </Link>
            </p>
        </>
    );
}

export default LoginForm;