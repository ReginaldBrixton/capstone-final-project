"use client"

import { Bell, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { app } from "../app/firebaseConfig"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app)
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className={`flex items-center h-[3rem] px-4 border-b shrink-0 md:px-6`}>
      <div className={`flex items-center w-full gap-4 layout-sm:ml-auto layout-sm:gap-2 layout-lg:gap-4`}>
        <form className="flex-1 mr-auto layout-sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className={`pl-8 layout-sm:w-[300px] layout-md:w-[200px] layout-lg:w-[300px]`}
              placeholder="Search projects..."
              type="search"
            />
          </div>
        </form>
        <ThemeSwitcher />
        <Button className="rounded-full" size="icon" variant="ghost">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <Image
                alt="User Avatar"
                className="rounded-full"
                src={user?.photoURL || "/placeholder.svg"}
                width={32}
                height={32}
                priority
              />
              <span className="sr-only">Profile</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

