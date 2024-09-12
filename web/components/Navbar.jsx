import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full">
        <div className="">
              <Link href="/" className="text-xl font-semibold">Brand</Link>
        </div>
        <div className="">
            <button>Login</button>
        </div>
    </nav>
  )
}
