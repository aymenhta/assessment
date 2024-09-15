import { getToken } from 'next-auth/jwt'; 
import { NextResponse } from 'next/server';

export default async function middleware(req) {
    const res = NextResponse.next();
    const session = await getToken({ req }); 

    // Get the pathname from the request URL
    const { pathname } = req.nextUrl;

    // Check if the user is authenticated
    if (!session) {
        // User is not logged in, redirect to the home pagee if accessing protected routes
        const protectedRoutes = ['/products', '/products/'];
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return res;
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all routes except API and static files
};
