"use client";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function CreateProductForm() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const formSchema = z.object({
        "title": z.string().min(2).max(255),
        "price": z.number().or(z.string()).pipe(z.coerce.number()), // accept both integers and floats
        "description": z.string().min(2).max(512),
        "image": z.string().url(),
        "category": z.string().refine(val => categories.includes(val), {
            message: 'Category must be one of the available options',
        }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            image: "",
            category: "",
        }
    });
    const router = useRouter();

    // fetch categories when mounted
    useEffect(() => {
        let fetchAndSetCategories = async () => {
            try {
                setLoading(true);

                const res = await fetch("https://fakestoreapi.com/products/categories", {
                    signal: AbortSignal.timeout(10000), // 10 seconds timeout
                });
                const categories = await res.json();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetCategories();
    }, []);

    async function onSubmit(values) {
        try {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values }),
            });

            const res = await response.json();
            if (res) {
                toast.success("product created successfully!");
                router.push("/products");
                router.refresh();
            }
        } catch (error) {
            toast.error("product could not be created!");
        }
    }

    return (
        <>
            {
                loading ? (
                    <p className="text-center text-slate-600 mt-5">loading...</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-3">
                            <label htmlFor="title" >
                                Title
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('title')}
                                    id="title"
                                    className={
                                        `${errors.title
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.title?.message && <p className="text-red-600">{errors.title?.message}</p>}
                            </div>
                        </div>

                        <div className="my-3">
                            <label htmlFor="price">
                                Price
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('price')}
                                    id="price" type="text"
                                    className={
                                        `${errors.price
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.price?.message && <p className="text-red-600">{errors.price?.message}</p>}
                            </div>
                        </div>

                        <div className="my-3">
                            <label htmlFor="description">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    {...register('description')}
                                    id="description"
                                    className={
                                        `${errors.description
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`}></textarea>
                                {errors.description?.message && <p className="text-red-600">{errors.description?.message}</p>}
                            </div>
                        </div>

                        <div className="my-3">
                            <label htmlFor="image">
                                Image
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('image')}
                                    id="image"
                                    className={
                                        `${errors.image
                                            ? 'border-red-600'
                                            : 'border-gray-300'}`} />
                                {errors.image?.message && <p className="text-red-600">{errors.image?.message}</p>}
                            </div>
                        </div>

                        <div className="my-3">
                            <label htmlFor="category">
                                Category
                            </label>
                            <div className="mt-1">
                                <select {...register('category')} id="category">
                                    <option value="">Select a category</option>
                                    {categories && categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category?.message && <p className="text-red-600">{errors.category?.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4 flex justify-start items-center gap-x-4">
                            <button type="submit"
                                className="btn btn__primary">
                                Create
                            </button>
                            <button type="reset"
                                className="btn btn__secondary">
                                Reset
                            </button>
                        </div>
                    </form >
                )}
        </>
    );
}
