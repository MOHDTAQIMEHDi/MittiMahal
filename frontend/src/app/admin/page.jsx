import { Users, ShoppingCart, Package, DollarSign, TrendingUp } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
          </div>
        </div>

        {/* Orders Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+12.2% from last month</p>
          </div>
        </div>

        {/* Products Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</h3>
            <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+4 new products added</p>
          </div>
        </div>

        {/* Users Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+10.1% from last month</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Sales Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 col-span-4">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Recent Sales</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">You made 265 sales this month.</p>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 dark:bg-blue-900">
                    <span className="font-medium text-blue-600 dark:text-blue-300">{String.fromCharCode(64 + i)}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Customer {i}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">customer{i}@example.com</p>
                  </div>
                  <div className="font-medium">+₹{(i * 1299).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 col-span-3">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Latest activities in your store</p>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[
                { icon: Package, text: "New product added: Earthen Pot" },
                { icon: ShoppingCart, text: "New order #1234 received" },
                { icon: Users, text: "New user registered: Rahul S." },
                { icon: DollarSign, text: "Payment received: ₹2,499" },
                { icon: TrendingUp, text: "Sales increased by 24%" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 dark:bg-blue-900">
                      <Icon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {i + 1} hour{i > 0 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

