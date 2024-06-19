'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react';import Email from "next-auth/providers/email";
import { useRouter } from "next/navigation";
import { SaferUser } from "@/types";

interface RegisterFormProps{
    currentUser: SaferUser|null;
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
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
            name:"",
            email:"",
            password:""
        }
    });
    const router=useRouter();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success("Account Created", {
                    id: "success"
                });
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false
                }).then((callback) => {
                    if (callback?.ok) {
                        toast.success("Logged In", { id: "success" });
                        router.push('/cart');
                        router.refresh();
                    }
                    if (callback?.error) {
                        toast.error(callback.error, { id: "error" });
                    }
                })
                .catch(()=>{toast.error("Something went wrong", { id: "error" });
                })
                .finally(() => {
                    setIsLoading(false);
                });
            })

    };
    return (
        <>
            <Heading title="Sign Up for E-Shop"/>
            <Button
            outline
            label="Sign Up with Google"
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
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={
                handleSubmit(onSubmit)
            }/>
            <p className="text-sm">
                Already have an account? 
                <Link className="underline" href='/login'>
                    Log In
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;