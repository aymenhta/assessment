import getProduct from "@/lib/helpers";
import DeleteProductComponent from "@/app/products/components/DeleteProductComponent";

export async function generateMetadata({ params }) {
    const product = await getProduct(params.id, true);

    return {
        title: `Delete ${product.title}`,
        description: product.description,
        openGraph: {
            title: `Delete ${product.title}`,
            description: product.description,
            url: `${process.env.WEBSITE_URL}/products/${params.id}`,
            images: [
                {
                    url: product.image,
                    width: 200,
                    height: 200,
                    alt: product.title,
                },
            ],
        },
    };
}


export default async function DeleteProduct({ params }) {
    const product = await getProduct(params.id, true);

    return (
        <DeleteProductComponent product={product} />
    )
}
