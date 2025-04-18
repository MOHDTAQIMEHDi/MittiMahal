import  React from "react"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"
import MainNavbar from "@/components/MainNavbar";



function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 dark:bg-gray-900">
                <MainNavbar />
                <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">{children}</main>
                </div>
            </body>
        </html>
    );
}

export default RootLayout;

