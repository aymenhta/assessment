import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import jwt from "jsonwebtoken";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                try {
                    const URL = `${process.env.BASE_URL}/auth/login`;

                    const res = await fetch(URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    const { token } = await res.json();
                    let decoded = jwt.decode(token)
                    return decoded ? {
                        id: decoded?.sub,
                        name: decoded?.user
                    } : null;
                    //? 28min
                } catch (error) {
                    return null;
                }
            }
        })
    ]
};