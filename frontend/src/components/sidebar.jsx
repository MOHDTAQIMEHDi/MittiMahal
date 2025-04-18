"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, ShoppingCart, Package, Settings, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: Home,
    },
    {
      name: "Manage Users",
      path: "/admin/manage-user",
      icon: Users,
    },
    {
      name: "Manage Orders",
      path: "/admin/manage-order",
      icon: ShoppingCart,
    },
    {
      name: "Manage Products",
      path: "/admin/manage-product",
      icon: Package,
    },
    
  ]

  return (
    <div className="hidden md:flex h-full w-64 flex-col bg-gray-50 border-r dark:bg-gray-800 dark:border-gray-700">
      <div className="flex h-14 items-center border-b px-4 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Mitti Mahal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.path
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-white ${
                  isActive
                    ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
    </div>
  )
}

