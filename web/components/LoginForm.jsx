"use client";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
    "username": z.string().min(1, { message: "username must be provided" }),
    "password": z.string().min(1, { message: "password must be provided" })
})

export default function LoginForm() {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                username: "",
                password: ""
            }
        });

    const [isInvalidAttempt, setIsInvalidAttempt] = useState(false);

    const router = useRouter()

    async function onSubmit(values) {
        const response = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
        });


        if (!response?.error) {
            setIsInvalidAttempt(false);
            router.push("/products");
            router.refresh()
        } else {
            setIsInvalidAttempt(true);
        }
    }

    return (
        <section className="w-full h-4/5 bg-gray-300 flex flex-col justify-center items-center"> 
            <form className="w-1/2 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <legend className="text-4xl font-semibold">Login</legend>
                {isInvalidAttempt && (
                    <div className="px-3 py-3 rounded-md border-2 border-red-600 bg-red-200 my-2">
                        <span className="text-red-600 font-medium">Invalid Credentials</span>
                    </div>
                )}
                <div className="my-2">
                    <label htmlFor="username" className="block mb-1.5">Username <span className="text-red-600">*</span></label>
                    <input
                        {...register('username')}
                        id="username"
                        className={
                            `py-1 px-3 rounded-sm shadow border-2 ${errors.username
                                ? 'border-red-600'
                                : 'border-slate-950'}`} />
                    {errors.username?.message && <p className="text-red-600">{errors.username?.message}</p>}
                </div>
                <div className="my-2">
                    <label htmlFor="password" className="block mb-1.5">Password <span className="text-red-600">*</span></label>
                    <input
                        {...register('password')}
                        id="password"
                        className={
                            `py-1 px-3 rounded-sm shadow border-2 ${errors.password
                                ? 'border-red-600'
                                : 'border-slate-950'}`} />
                    {errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>}
                </div>
                <div className="mt-5">
                    <input className="btn btn__primary cursor-pointer" type="submit" value="Login" />
                    <input className="btn btn__secondary cursor-pointer" type="reset" value="Reset" />
                </div>
            </form>

            {/* OAUTH */}
            <div>
                <button className="btn btn__primary" onClick={() => signIn('github')}>Sign-in with github</button>
                <button className="btn btn__secondary" onClick={() => signIn('google')}>Sign-in with google</button>
            </div>
        </section>
    )
}
