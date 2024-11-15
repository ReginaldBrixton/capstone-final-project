"use client"

import { Home, List, PieChart, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'

const footbarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard", color: "text-blue-500 dark:text-blue-400" },
  { icon: List, label: "Projects", route: "/student/projects", color: "text-green-500 dark:text-green-400" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard", color: "text-purple-500 dark:text-purple-400" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat", color: "text-pink-500 dark:text-pink-400" },
  { icon: Settings, label: "Settings", route: "/student/settings", color: "text-gray-500 dark:text-gray-400" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    footbarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <nav className="layout-sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        {footbarItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.route}
            className={`flex flex-col items-center py-2 ${
              pathname === item.route ? 'text-blue-500' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
