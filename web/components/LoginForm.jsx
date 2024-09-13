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
        <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                {isInvalidAttempt && (
                    <div className="px-3 py-3 rounded-md border-2 border-red-600 bg-red-200 my-2">
                        <span className="text-red-600 font-medium">Invalid Credentials</span>
                    </div>
                )}
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div class="mt-1">
                                <input
                                    {...register('username')}
                                    id="username"
                                    className={
                                        `appearance-none rounded-md relative block w-full
                                        px-3 py-2 placeholder-gray-500 text-gray-900 
                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                        sm:text-sm border ${errors.username
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.username?.message && <p className="text-red-600">{errors.username?.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div class="mt-1">
                                <input
                                    {...register('password')}
                                    id="password" type="password"
                                    className={
                                        `appearance-none rounded-md relative block w-full
                                        px-3 py-2 placeholder-gray-500 text-gray-900 
                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                        sm:text-sm border ${errors.password
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.password?.message && <p className="text-red-600">{errors.password?.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                class="btn btn__primary w-full">

                                Sign in
                            </button>
                        </div>
                    </form>
                    <div class="mt-6">

                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button onClick={() => signIn('github')}
                                    class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-zinc-50">
                                    <img class="h-6 w-6" src="/icons/github.svg"
                                        alt="" />
                                </button>
                            </div>
                            <div>
                                <button onClick={() => signIn('google')}
                                    class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-zinc-50">
                                    <img class="h-6 w-6" src="/icons/google.svg"
                                        alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}