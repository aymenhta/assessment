import { Poppins } from "next/font/google";
import "./globals.css";

// components
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

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={poppins.className}
        >
          <main className="page__container">
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </SessionWrapper>
  );
}
