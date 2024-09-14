'use client';

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const { data: session } = useSession();

  function handleLogout() {
    toast.success("logged out successfully");
    signOut();
  }

  return (
    <nav className="flex justify-between items-center w-full py-3">
      <Link href="/" className="text-xl font-semibold">Brand</Link>
      <div className="flex items-center justify-center gap-x-3">
        {session && (
          <>
            <div className="flex items-center justify-center gap-x-2">
              <Image
                className="rounded-md "
                src={session.user?.image || '/images/default_avatar.jpeg'} alt="profile image" width={30} height={30} />
              <span className="font-semibold">{session.user?.name}</span>
            </div>
            <button className="btn btn__secondary" onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>
    </nav >
  )
}
