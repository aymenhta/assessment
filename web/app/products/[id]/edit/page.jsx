import EditProductForm from '../../components/EditProductForm';
import getProduct from "@/lib/helpers";

export async function generateMetadata({ params }) {
    const product = await getProduct(params.id, false);

    return {
        title: `Edit ${product.title}`,
        description: product.description,
        openGraph: {
            title: `Edit ${product.title}`,
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


export default async function EditProduct({ params }) {
    const product = await getProduct(params.id, false);
    return (
        <EditProductForm product={product} />
    )
}
