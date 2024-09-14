export default async function getProduct(id) {
    try {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            signal: AbortSignal.timeout(6000),
            next: {
                revalidate: 60 * 60 * 12 // every 12 hours
            }
        });

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}