import { Poppins } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: "Products application",
  description: "A products application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`bg-gray-100 ${poppins.className}`}
        >
          {session ? (
            <main className="page__container">
              <Navbar />
              {children}
            </main>
          ) : (
              children 
          )}
        </body>
      </html>
    </SessionWrapper>
  );
}
