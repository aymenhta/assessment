import "./globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Products application",
  description: "A products application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <SessionWrapper>
      <html lang="en">
        <body className="bg-zinc-50">
          <Toaster position="top-center" />

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
