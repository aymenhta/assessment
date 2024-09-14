"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteProductComponent({ product }) {
    const router = useRouter();

    async function handleDelete() {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
                method: "DELETE"
            });

            const result = await res.json();
            if (!result) {
                toast.error("product could not be deleted");
            } else {
                toast.success("product was deleted succussfully");
                router.push("/products");
                router.refresh();
            }
        } catch (error) {
            toast.error("product could not be deleted");
        }
    }
    return (
        <section className="mt-5">
            <h1 className="text-3xl font-bold">Warning: This action is irreversible!</h1>
            <p>
                Are you sure you want to delete <span className="font-semibold">&apos;{product.title}&apos;</span> ?? Once deleted, all 
                associated data will be permanently removed and cannot be recovered. 
                Please double-check to ensure that you want to proceed with this action.
            </p>

            <div className="flex justify-start items-center gap-x-4 mt-3">
                <button className="btn btn__primary" onClick={handleDelete}>Delete</button>
                <Link className="btn btn__secondary" href={`/products/${product.id}`}>Cancel</Link>
            </div>
        </section>
    )
}
