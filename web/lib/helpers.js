export async function getProducts() {
    try {
        let res = await fetch(`https://fakestoreapi.com/products`, {
            signal: AbortSignal.timeout(10000), // 10 seconds
            next: {
                revalidate: 60 * 60 * 6 // cached for 6 hours
            }
        });

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getProduct(id, cachable) {
    try {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            signal: AbortSignal.timeout(10000), // 10 seconds
            next: {
                revalidate: cachable ? 60 * 60 * 12 : 0
            }
        });

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}