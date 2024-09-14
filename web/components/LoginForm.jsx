"use client";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from 'react-hot-toast';


export default function LoginForm() {

    const formSchema = z.object({
        "username": z.string().min(1, { message: "username must be provided" }),
        "password": z.string().min(1, { message: "password must be provided" })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const router = useRouter();

    async function onSubmit(values) {
        const response = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
        });


        if (!response?.error) {
            toast.success("welcome back");
            router.push("/products");
            router.refresh();
        } else {
            toast.error("invalid credentials");
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="username">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('username')}
                                    id="username"
                                    className={
                                        `${errors.username
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.username?.message && <p className="text-red-600">{errors.username?.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('password')}
                                    id="password" type="password"
                                    className={
                                        `${errors.password
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="btn btn__primary w-full">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button onClick={() => signIn('github')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-zinc-50">
                                    <Image width={24} height={24}  src="/icons/github.svg"
                                        alt="sign in with github" />
                                </button>
                            </div>
                            <div>
                                <button onClick={() => signIn('google')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-zinc-50">
                                    <Image width={24} height={24} src="/icons/google.svg"
                                        alt="sign in with google" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}