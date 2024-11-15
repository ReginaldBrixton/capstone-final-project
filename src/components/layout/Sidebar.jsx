"use client"

import { Home, Layout, ClipboardCheck, PieChart, Settings, FileText, Archive, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarItems = [
  { icon: Home, 
    label: "Dashboard", 
    route: "/student/dashboard", 
    color: "", 
    bgColor: "bg-blue-100 dark:bg-blue-900" 
  },
  { icon: Layout, 
    label: "Projects", 
    route: "/student/projects", 
    color: "", 
    bgColor: "bg-green-100 dark:bg-green-900" 
  },
  { icon: FileText, 
    label: "Submissions", 
    route: "/student/submissions", 
    color: "", 
    bgColor: "bg-indigo-100 dark:bg-indigo-900" 
  },
  { icon: ClipboardCheck, 
    label: "Feedback", 
    route: "/student/review", 
    color: "", 
    bgColor: "bg-yellow-100 dark:bg-yellow-900" 
  },
  { icon: PieChart, 
    label: "Score Board", 
    route: "/student/scoreboard", 
    color: "", 
    bgColor: "bg-purple-100 dark:bg-purple-900" 
  },
  { icon: MessageSquare, 
    label: "Chat", 
    route: "/student/chat", 
    color: "", 
    bgColor: "bg-pink-100 dark:bg-pink-900" 
  },
  { icon: Settings, 
    label: "Settings", 
    route: "/student/settings", 
    color: "", 
    bgColor: "bg-gray-100 dark:bg-gray-900" 
  },
  { icon: Archive, 
    label: "Archived", 
    route: "/student/archived", 
    color: "", 
    bgColor: "bg-orange-100 dark:bg-orange-900" 
  },
  { icon: HelpCircle, 
    label: "Help", 
    route: "/student/help", 
    color: "", 
    bgColor: "bg-teal-100 dark:bg-teal-900" 
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    sidebarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <aside className={`hidden layout-sm:flex flex-col w-14 layout-lg:w-[12rem] h-screen bg-gray-100 dark:bg-gray-800`}>
      <div className="flex items-center justify-center h-[3rem] bg-gray-200 dark:bg-gray-700">
        <Layout className="h-6 w-6 lg:hidden text-gray-600 dark:text-gray-300" />
        <span className="hidden layout-lg:inline text-lg font-semibold">Capstone Project</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.route}
                  className={`flex items-center h-12 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    pathname === item.route ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                  >
                  <div className={`p-1.5 rounded-md ${item.bgColor}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className={`ml-4 hidden layout-lg:inline ${item.color}`}>{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="layout-lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}
